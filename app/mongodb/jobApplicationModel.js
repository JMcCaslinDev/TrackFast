import { Schema, model, models } from 'mongoose';

const jobApplicationSchema = new Schema({
  account_id: { type: String, required: true },
  job_title: String,
  company_name: String,
  employment_type: String,
  work_location_mode: String,
  date_applied: Date,
  application_method: String,
  pay_amount: Number,
  pay_amount_max: Number,
  pay_type: String,
  experience_level: String,
  location: String,
  application_status: String,
  job_posting_url: String,
  job_description: String,
  notes: String,
  pinned: Boolean
}, { collection: 'job_applications' });

const Job_Application = models.Job_Application || model('Job_Application', jobApplicationSchema);

export default Job_Application;
