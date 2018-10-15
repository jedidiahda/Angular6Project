import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  //fullNameLength = 0;
  validationMessages = {
    'fullName' : {
      'required' : 'Full name is required',
      'minlength' : 'full name must be greater than 2',
      'maxlength' : 'full name must be less than 10'
    },
    'email' :{
      'required': 'Email is required'
    },
    'skillName':{
      'required': 'skill name is required',
    },
    'experienceInYears':{
      'required': 'experience is required'
    },
    'proficiency':{
      'required': 'proficiency is required'
    }
  };

  formErrors = {
    'fullName':'',
    'email' :'',
    'skillName':'',
    'experienceInYears':'',
    'proficiency':''
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['',Validators.required],
      skills: this.fb.group({
        skillName: ['',Validators.required],
        experienceInYears:['',Validators.required],
        proficiency:['',Validators.required],
      })
    });


    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    /*this.employeeForm.valueChanges.subscribe((value : any) => {
      //this.fullNameLength = value.length;
      console.log(JSON.stringify(value)) ;
    });*/

    /*this.employeeForm.get('skills').valueChanges.subscribe((value:any) => {
      console.log(JSON.stringify(value));
    });*/

    /*this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });*/
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void{
    console.log(Object.keys(group.controls).forEach((key:string) => {
      const abstractcontrol = group.get(key);
      if(abstractcontrol instanceof FormGroup){
        this.logValidationErrors(abstractcontrol);
        //abstractcontrol.disable();
      }else{
        //abstractcontrol.disable();
        //abstractcontrol.markAsDirty();
        console.log('Key = ' + key + ' value = ' + abstractcontrol.value);
        this.formErrors[key] = '';
        if(abstractcontrol && !abstractcontrol.valid && (abstractcontrol.touched || abstractcontrol.dirty)){
          const messages = this.validationMessages[key];
          console.log(messages);
          console.log(abstractcontrol.errors);

          for(const errorKey in abstractcontrol.errors){
            if(errorKey){
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }

        }
      }
    }));
  }

  onSubmit(): void{
    console.log(this.employeeForm.value);
  }

  onLoadDataClick(): void{

    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors)
    /*this.employeeForm.setValue({
      fullName: 'lida mao',
      email:'jedidiahda@hotmail.com',
      skills:{
        skillName: 'C#',
        experienceInYears: 1,
        proficiency: 'beginner'
      }
    });*/
    
  }



}
