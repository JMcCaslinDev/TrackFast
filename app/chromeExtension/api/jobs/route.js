'use server';

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../mongodb/api/connect';
import Job_Application from '../../../mongodb/jobApplicationModel'; // Adjust the import to your model's location

export async function POST(request) {
  try {
    const jobData = await request.json();
    console.log("\njobData: ", jobData, "\n");

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      const userId = decoded.userId;  // Ensure that this is correctly extracted from the token
      console.log('User ID from token:', userId);
      if (!userId) {
        throw new Error('Account ID not found in token');
      }

      console.log("\nuserId: ", userId, "\n");

      const base_pay = jobData.base_pay ? parseFloat(jobData.base_pay) : 0.0;
      const max_pay = jobData.max_pay ? parseFloat(jobData.max_pay) : 0.0;
      const pinned = jobData.pinned || false;
      const date_applied = jobData.date_applied ? new Date(jobData.date_applied) : new Date();

      const formattedJobData = {
        account_id: userId,
        job_title: jobData.job_title || '',
        company_name: jobData.company_name || '',
        employment_type: jobData.employment_type || '',
        work_location_mode: jobData.work_location_mode || '',
        date_applied: date_applied,
        application_method: jobData.application_method || '',
        pay_amount: base_pay,
        pay_amount_max: max_pay,
        pay_type: jobData.pay_type || '',
        experience_level: jobData.experience_level || '',
        location: jobData.location || '',
        application_status: jobData.application_status || '',
        job_posting_url: jobData.job_posting_url || '',
        job_description: jobData.job_description || '',
        notes: jobData.notes || '',
        pinned: pinned
      };

      try {
        await connectToDatabase(); // Ensure you call this to establish a DB connection
        const newJobApplication = new Job_Application(formattedJobData);
        console.log('Formatted Job Data:', formattedJobData);
        console.log('Formatted Job Data Types:', Object.entries(formattedJobData).map(([key, value]) => `${key}: ${typeof value}`));
        await newJobApplication.save();

        // Convert the Mongoose document to a plain object before returning it
        const plainJobApplication = newJobApplication.toObject();

        return NextResponse.json({ message: 'Job saved successfully', data: plainJobApplication }, { status: 201 });
      } catch (error) {
        console.error('MongoDB Error:', error);
        if (error.name === 'MongoServerError' && error.code === 121) {
          console.log('Validation Error Details:', error);
          const validationErrors = error.errInfo?.details?.schemaRulesNotSatisfied || [];
          return NextResponse.json({
            error: 'Validation failed',
            message: error.message,
            validationErrors: validationErrors.map(v => ({
              field: v.operatorName,
              issues: v.propertiesNotSatisfied.map(property => ({
                property: property.propertyName,
                reason: property.reason
              }))
            }))
          }, { status: 400 });
        } else {
          return NextResponse.json({
            error: 'Internal server error',
            message: error.message
          }, { status: 500 });
        }
      }
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}
