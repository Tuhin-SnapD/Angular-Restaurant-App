export class Feedback {
  firstname: string;
  lastname: string;
  telnum: string;
  email: string;
  agree: boolean;
  contactType: string;
  feedbackType?: string;
  message: string;
}

export const ContactType = ['Tel.', 'Email'];
