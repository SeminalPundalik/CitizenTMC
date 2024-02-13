import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent {
  loading: boolean = false;
  otpvalid: boolean = false;
  Registerform!: FormGroup;
  personaldetails!: FormGroup;
  enteredOTP: any;
  OTPform!: FormGroup;
  currentIndex = 0;
  captcha:any;
  areValuesEqualError: boolean = false;
  personaldetailsforms: boolean = false;
  constructor(private formBuilder: FormBuilder, private loginService: AuthService) {
    this.initLoginForm();
  }

  slides = [
    { image: 'assets/icons/icon1 (1).png', caption: 'Single Account Multiple Online Services' },
    { image: 'assets/icons/icon2 (1).png', caption: 'View Transaction History Anytime' },
    { image: 'assets/icons/icon3 (1).png', caption: '100% Secure Online Payment' },
  ];

  ngOnInit() {
   
      // Continue with your existing initialization code
      this.startAutoSlider();
     
    
  }
  initLoginForm(): void {
    this.personaldetailsforms=false;
    this.Registerform = this.formBuilder.group({
      mobileNo: ['', [Validators.required]],
      ConfirmMobileNo: ['', [Validators.required]],
      CaptchaInputText: ['', [Validators.required]],
    });
  }

  onOtpChange(otp: any) {
    this.otpvalid = otp.toString().length === 4;
    this.enteredOTP = otp;
  }
  private startAutoSlider() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000); // Change slide every 5 seconds (adjust as needed)
  }
  areValuesEqual(controlName1: string, controlName2: string): boolean {
    const value1 = this.Registerform.get(controlName1)?.value;
    const value2 = this.Registerform.get(controlName2)?.value;

    return value1 === value2;
  }

  showSlide(index: number) {
    this.currentIndex = index;

    this.startAutoSlider(); // Restart auto slider
  }

  onGetOtpSubmit() {
    this.personaldetailsforms=false;
    if (this.Registerform.valid) {
      const storedCaptcha = localStorage.getItem("captcha");
      const captchs =this.Registerform.value.CaptchaInputText
      if (storedCaptcha===captchs) {
      this.loading = true;
      const mobileNumber = this.Registerform.value.mobileNo;
      this.loginService.SearchUser(mobileNumber).subscribe(
        (res: any) => {
          if (res.length !== 0) {
            localStorage.setItem('Name', res[0].Applicantname);
            localStorage.setItem('MobNo', res[0].MobileNo);
            this.loading = false;
            this.getOTP();
          } else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'No Applications',
              text: 'There is no Application with this Mobile No.',
            });
          }
      
        },
        (error) => {
          this.loading = false;
          console.error('Error:', error);
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Captcha',
        text: 'Enter the Valid Captcha',
      });
    }
  }
  }
  otpform(): void {
    this.OTPform = this.formBuilder.group({
      Otp: ['', [Validators.required]],
    });
  }
  OnotpSubmit() {
   
      if (this.enteredOTP === this.otp) {
        this.personaldetailsforms=true;
        this.personaldetailsform();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Wrong OTP',
          text: 'Please enter Correct OTP',
        });
      }
   

  }
  SubmitPersonaldetails(){
    if (this.personaldetails.valid) {
if(this.personaldetails.value.txtPassword===this.personaldetails.value.txtcnfpassword){

}else{
  Swal.fire({
    icon: 'error',
    title: 'Passwords are not same',
    text: '',
  });
}
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Failed To submit',
        text: 'Please fill the details',
      });
    }
  }
  arePasswordsMatching(): boolean {
    const password = this.personaldetails.get('txtPassword')?.value;
    const confirmPassword = this.personaldetails.get('txtcnfpassword')?.value;

    return password === confirmPassword;
  }
  personaldetailsform() {
    this.personaldetails = this.formBuilder.group({
      txtName: ['', [Validators.required]],
      txtLname: ['', [Validators.required]],
      txtPassword: ['', [Validators.required]],
      txtcnfpassword: ['', [Validators.required]],
    });
  }
 
  otpshow: boolean = false;
  otp: any;

  getOTP(): void {
    this.loading = true;
    const mobileNumber = this.Registerform.value.mobileNo;
    this.loginService.getOtp(mobileNumber).subscribe(
      (otp: any) => {
        localStorage.setItem('MobileNo', mobileNumber);
        this.otp = otp.value.toString();
        this.otpshow = true;
        this.loading = false;
        this.otpform()
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent Successfully',
          text: 'OTP has been sent successfully!',
        });
      },
      (error) => {
        this.loading = false;
        console.error('Error:', error);
      }
    );
  }
}
