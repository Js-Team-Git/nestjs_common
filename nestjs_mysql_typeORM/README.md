 Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

# #####################
# *****INSTALLATION****
# #####################

 To get started, you can either scaffold the project with the Nest CLI, or clone a starter project (both will produce the same outcome).

 To scaffold the project with the Nest CLI, run the following commands. This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project. Creating a new project with the Nest CLI is recommended for first-time users.

# STEP:1- 
    Install the Nest CLI and generate a new project using following commands.
    $ npm i -g @nestjs/cli
    $ nest new project-name
	 
# STEP:2- 
    After using command "nest new project-name" you will be asked to choose the package manager. So choose the package manager as 'npm'as all these details are based on npm package.
	 
 Instead of generating it through Nest CLI we can also use the alternatives to clone the starter project wit Git. Below are the commands to clone and install modules.

 # ALTERNATIVES:-
	$ git clone https://github.com/nestjs/typescript-starter.git project
    $ cd project
    $ npm install
	
# STEP:3- 
    After project has been generated using nest CLI or using above ALTERNATIVES, run the application using following commands:

    $ npm run start  
	
# The above command starts the app with the HTTP server listening on the port defined in the src/main.ts file.   Once the application is running, open your browser and navigate to http://localhost:3000/. You should see the Hello World! message
	    
#	*****OR****
		
 To watch changes in you files, you can run the following command to run the application. Using below command help you to watch file, automatically recompiling and reloading the server.	
	
	$ npm run start:dev    
	
# If you get the ERROR as follows:
	TypeError: this.socketModule.register is not a function 
	TypeError: this.microservicesModule.register is not a function
	
    To solve these erros run the following commands: 
	
	$ npm i --save @nestjs/websockets @nestjs/platform-socket.io
	$ npm i --save @nestjs/microservices
	
 After executing above commands run you application using $ npm run start:dev, you will see your Nest Application Successfully Started, again open your browser and navigate to http://localhost:3000/. You should see the Hello World! message.
	

# ################################
# ******INTEGRATING WITH DBs******
# ################################

 To integrate with different DB we simply need to install the associated client API libraries for your selected database. We will see some DB integration with their configurations and steps to follow:	
# *NOTE:- We don't need to change the code to use different DBs MySQL, PostgreSQL & MSSQL. Only DB configuration should be done accordingly. Follow the steps below to install DBs connection driver/module. To install use command based on you DB.

#   Step:1- Install driver using command 
             $ npm install --save @nestjs/typeorm typeorm mysql2  `For MySQL`
             $ npm install --save @nestjs/typeorm typerom pg      `For PostgreSQL`
	  		 $ npm install --save @nestjs/typeorm typerom mssql   `For MSSQL`
	  								   
#   Step:2- import { TypeOrmModule } from '@nestjs/typeorm'; in app.module.ts.
#   Step:3- Add database configurations to connect with DB and run the application.
  
  
# INTEGRATING WITH MongoDB:- Nest support two methods for integrating with MongoDB. We will see steps to install database drivers and the changes to be done in our code.

# METHOD:1- Using @nestjs/typeorm package.		
#   Step:1- 
    Install the dependencies using command $ npm i mongodb --save.
#   Step:2- 
    Change DB configurations as per you MongoDB in app.module.ts under TyperOrmModule import.
#   Step:3- 
    In your user.entity.ts entity file use @ObjectIdColumn instead of @PrimaryColumn or @PrimaryGeneratedColumn.It should be as  follows:
	
	        @Entity()
            export class User {
                @ObjectIdColumn()
                id: ObjectID
#	*Note:- id is ObjectID type but not number type. So you need to make changes to id type in you code whereever it is required.	

#	Step:4- 
    RUN your application using command $ npm run start:dev		

	
# METHOD:2- Using @nestjs/mongoose package.			

#   Step:1- install the dependencies using command $ npm i @nestjs/mongoose mongoose.
#	Step:2- import { MongooseModule } from '@nestjs/mongoose'; in app.module.ts file as follows.
	
        	@Module({
                     imports: [
                     MongooseModule.forRoot('mongodb://localhost:27017/Employee'),
             ]
			 
           Here, ensure you have the MongoDB URI that points to your database. Parameter Employee represents the database  that Mongoose  will create to save user details.		 
     	        
#   Step:3- Creat an Employee database schema as follows.
	        A schema will represent the database representation of an employee. We will use Mongoose schema to create this database	representation. Inside the src folder, create a schema folder, and inside this directory create an employee.schema.ts file.	Finally, represent the employee database as shown below:
			
			import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
			import { Document } from "mongoose";
			
			export type EmployeeDocument = Employee & Document
			
			@Schema()
			export class Employee{
                @Prop()
                Firstname: string
                
                @Prop()
                Surname: string
                
                @Prop()
                Email: string
                
                @Prop()
                Designation: string
                
                @Prop()
                Address: string
                
                @Prop()
                Salary: string
            }
            
            export const EmployeeSchema = SchemaFactory.createForClass(Employee)
			
#   Step:4- Create an Interface.
            An interface in a typescript class is used for checking types. We need to check every data entry and make sure it matches the data we want to be added to the database. Go ahead and create an entities directory inside the src folder. Inside the entities folder, create an employee.entity.ts and set up the interface as follows:	
			
		    *First install class-validator libraries using command $ npm i --save class-validator class-transformer. After installing add the below code to your employee.entity.ts
			
			import { IsString } from "class-validator";

            export class Employee{
                @IsString()
                Firstname: string;
            
                @IsString()
                Surname: string;
            
                @IsString()
                Designation: string;
            
                @IsString()
                Email: string;
            
                @IsString()
                Address: string;
            
                @IsString()
                Salary: string
            }
			
#	Step:5- Create DTO
            DTO stands for Data Transfer Object. It encapsulates the data and defines how it will be transmitted over the network. Inside the src folder, create a dto directory. Here we are creating a CRUD application. Thus we need to define DTO for adding and manipulating employee data. To create an employee and transmit the data to the internet create a create-employee.dto.ts file and add the following CreateEmployeeDto class:

            import { Employee } from "../entities/employee.entity";

            export class CreateEmployeeDto extends Employee{}	

            To update and change employee data and transmit the data to the internet, create an update-employee.dto.ts file and add the following 	UpdateEmployeeDto class:			
			
			import { PartialType } from "@nestjs/mapped-types";
            import { CreateEmployeeDto } from "./create-employee.dto";
            
            export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto){}

#   Step:6- Create Service.
            A service handles the logic of a Nest.js API, the database interactions, and returning the appropriate responses. This service will define how the API communicates with the database to perform different operations using Mongoose. This includes:

            Adding employee using create()
            Fetching employee (s) findAll() and findOne.
            Updating an employee using update()
            Deleting an employee using remove()
            
			First create employee folder inside you src directory. To create a service to execute these methods create an employee.service.ts file inside the employee  folder as follows:	
			
			import { Injectable } from "@nestjs/common";
            import { InjectModel } from "@nestjs/mongoose";
            import { Model } from "mongoose";
            import { CreateEmployeeDto } from "src/dto/create-employee.dto";
            import { UpdateEmployeeDto } from "src/dto/update-employee.dto";
            import { Employee, EmployeeDocument } from "src/schema/employee.schema";
            
            @Injectable()
            export class EmployeeService {
            
                constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) { }
            
                async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDocument> {
                    const employee = new this.employeeModel(createEmployeeDto);
                    return await employee.save()
                }
            
                async findAll(): Promise<EmployeeDocument[]>{
                    return await this.employeeModel.find().exec();
                }
            
                async findOne(id: string){
                    return await this.employeeModel.findById(id);
                }
            
                async update(id: string, updateEmplyeeDto: UpdateEmployeeDto): Promise<EmployeeDocument>{
                    return await this.employeeModel.findByIdAndUpdate(id, updateEmplyeeDto);
                }
            
                async remove(id: string){
                    return await this.employeeModel.findByIdAndDelete(id);    
                }
            }
			
#	Step:7- Create Controllers.
            Controllers allow creating routes to execute the created service logic. This lets you create and handle HTTP calls for the API. To handle incoming requests and responses, create an employee.controller.ts file inside the employee directory and add the following controllers using the HTTP methods (GET, POST, PUT, DELETE):
			
			import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
            import { CreateEmployeeDto } from "../dto/create-employee.dto";
            import { UpdateEmployeeDto } from "../dto/update-employee.dto";
            import { EmployeeService } from "./employee.service";
            
            @Controller('employee')
            export class EmployeeController{
            
                constructor(private readonly employeeService: EmployeeService){}
            
                @Post()
                create(@Body() createEmployeeDto: CreateEmployeeDto){
                    return this.employeeService.create(createEmployeeDto);
                }
            
                @Get()
                findAll(){
                    return this.employeeService.findAll();
                }
            
                @Get(':id')
                findOne(@Param('id') id: string){
                    return this.employeeService.findOne(id);
                }
            
                @Put(':id')
                update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto){
                    return this.employeeService.update(id, updateEmployeeDto);
                }
            
                @Delete(':id')
                remove(@Param('id') id: string){
                    return this.employeeService.remove(id)
                }
            }
            
#   Step:8- Create Module.
            To execute the above logic, we need a module. This will execute the controllers and providers (service). To create a module, add a new file to the employee directory and call it employee.module.ts and add the following code block:	
			
			import { Module } from "@nestjs/common";
            import { MongooseModule } from "@nestjs/mongoose";
            import { EmployeeController } from "./employee.controller";
            import { EmployeeService } from "./employee.service";
            import { Employee, EmployeeSchema } from "../schema/employee.schema";
            
            @Module({
                imports: [
                    MongooseModule.forFeature([
                        {
                            name: Employee.name,
                            schema: EmployeeSchema
                        },
                    ])
                ],
                controllers: [EmployeeController],
                providers: [EmployeeService]
            })
            export class EmployeeModule{}
			
			
			For this module to be executed by Nest.js, we need to add the controllers and providers (service) inside the employee.module.ts to the app.module.ts file as follows: Add the employee.module.ts import:

            import { EmployeeModule } from './employee/employee.module';
            
            Execute the module inside the @Module
			
         	@Module({
               imports: [
               MongooseModule.forRoot('mongodb://localhost:27017/Employee'),
               EmployeeModule
            ],
            
#   Step:9- RUN you application using command $ npm run start:dev and you can test it using postman. 
	
	