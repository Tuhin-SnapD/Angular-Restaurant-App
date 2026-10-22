import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut,expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
	  '[@flyInOut]': 'true',
	  'style': 'display: block;'
  },
  animations: [
	  flyInOut(),
	  expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackcopy: Feedback;
  contactType = ContactType;
  errMess: string;
  isLoading: boolean;
  isShowingResponse: boolean;
	@ViewChild('fform') feedbackFormDirective;
	
  formErrors = {
	  'firstname': '',
	  'lastname' : '',
	  'telnum' : '',
	  'email': '',
	  'message': ''
  };
	
  validationMessages = {
	  'firstname': {
		  'required':'First Name is Required.',
		  'minlength': 'First Name Length must be atleast 2 characters long',
		  'maxlength':'First Name Length cannot be more than 25 characters long'
	  },
	  
	  'lastname': {
		  'required':'Last Name is Required.',
		  'minlength': 'Last Name Length must be atleast 2 characters long',
		  'maxlength':'Last Name Length cannot be more than 25 characters long'
	  },
	  
	  'telnum':{
		  'required':'Tel. number is Required.',
		  'pattern': 'Tel. number must be 7-15 digits.'
	  },
	  
	  'email':{
		  'required':'Email is Required.',
		  'email': 'Email not in valid format.'
	  },
	  
	  'message':{
		  'required':'Message is Required.',
		  'minlength': 'Message must be at least 10 characters long.'
	  }
	  
  };

  constructor(private fb: FormBuilder,
			  private feedbackService: FeedbackService) {
    this.createForm();
	this.isLoading = false;
    this.isShowingResponse = false;
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'Tel.',
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
	  this.feedbackForm.valueChanges
	  	.subscribe(data => this.onValueChanged(data));
	  
	  
	  this.onValueChanged();  //reset form validation messages
  }

  onValueChanged(data?: any){
	  if (!this.feedbackForm){
		  return;
	  }
	  const form = this.feedbackForm;
	  
	  for(const field in this.formErrors){
		  if(this.formErrors.hasOwnProperty(field)) {
			  //clear previous error message
			  this.formErrors[field]= '';
			  const control = form.get(field);
			  
			  if(control && control.dirty && !control.valid) {
				  const messages = this.validationMessages[field];
				  for(const key in control.errors) {
					  if (control.errors.hasOwnProperty(key)) {
						this.formErrors[field] += messages[key]  + ' '; 
					  }
				  }
			  }
		  }
	  }
	  
  }
	
  onSubmit() {
    if (this.feedbackForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.isShowingResponse = false;
    this.errMess = null;
    this.feedback = this.feedbackForm.value;

    this.feedbackService.putFeedback(this.feedback)
      .subscribe(feedback => {
          this.feedback = feedback;
          this.resetFeedbackForm();
        },
        errmess => {
          this.isLoading = false;
          this.isShowingResponse = false;
          this.errMess = <any>errmess;
        },
        () => {
          this.isShowingResponse = true;
          setTimeout(() => {
              this.isShowingResponse = false;
              this.isLoading = false;
            }, 5000
          );
        });
  }

  resetFeedbackForm() {
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: ''
    });

    if (this.feedbackFormDirective) {
      this.feedbackFormDirective.resetForm();
    }
  }

  // New methods for enhanced user experience
  openMap() {
    const address = '121, Clear Water Bay Road, Clear Water Bay, Kowloon, HONG KONG';
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapUrl, '_blank');
  }

  callPhone() {
    window.location.href = 'tel:+85212345678';
  }

  sendEmail() {
    const email = 'info@lartisanculinaire.com';
    const subject = 'Restaurant Inquiry';
    const body = 'Hello, I would like to inquire about...';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }

  resetForm() {
    this.isLoading = false;
    this.isShowingResponse = false;
    this.feedback = null;
    this.feedbackcopy = null;
    this.errMess = null;
    this.resetFeedbackForm();
  }

}
