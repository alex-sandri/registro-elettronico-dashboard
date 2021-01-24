import { Injectable } from '@angular/core';

export interface IUser
{
  type: "admin" | "student" | "teacher";
  firstName: string;
  lastName: string;
  email: string;
}

export interface IGrade
{
  value: number;
  timestamp: string;
  description: string;
  subject: ISubject;
}

export interface IClass
{
  name: string;
  students: IStudent[];
}

export interface ISubject
{
  name: string;
  description: string;
}

export interface IAdmin extends IUser
{
  type: "admin";
}

export interface IStudent extends IUser
{
  type: "student";
  grades: IGrade[];
  class: IClass;
}

export interface ITeacher extends IUser
{
  type: "teacher";
}

export interface IAuthToken
{
  id: string;
  type: "admin" | "student" | "teacher";
  user: IUser;
}

interface IApiServiceResponse<T>
{
  status: {
    code: number;
    message: string;
  };
  data?: T;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  private readonly ENDPOINT = "http://localhost:4000";

  private async send(method: "DELETE" | "GET" | "POST" | "PUT", url: string, body?: any): Promise<any>
  {
    const response = await fetch(`${this.ENDPOINT}/${url}`, {
      method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user.token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // No Content
    if (response.status === 204)
    {
      return;
    }

    return response.json();
  }

  public async retrieveUser(id: string): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("GET", `users/${id}`);
  }

  public async listAdmins(): Promise<IApiServiceResponse<IAdmin[]>>
  {
    return this.send("GET", "admins");
  }

  public async retrieveStudent(id: string): Promise<IApiServiceResponse<IStudent>>
  {
    return this.send("GET", `students/${id}`);
  }

  public async listStudents(): Promise<IApiServiceResponse<IStudent[]>>
  {
    return this.send("GET", "students");
  }

  public async listTeachers(): Promise<IApiServiceResponse<ITeacher[]>>
  {
    return this.send("GET", "teachers");
  }

  public async retrieveClass(id: string): Promise<IApiServiceResponse<IClass>>
  {
    return this.send("GET", `classes/${id}`);
  }

  public async listClasses(): Promise<IApiServiceResponse<IClass[]>>
  {
    return this.send("GET", "classes");
  }

  public async listSubjects(): Promise<IApiServiceResponse<ISubject[]>>
  {
    return this.send("GET", "subjects");
  }

  public async createAuthToken(credentials: { email: string, password: string }): Promise<IApiServiceResponse<IAuthToken>>
  {
    return this.send("POST", "tokens", credentials);
  }

  public async createGrade(data: {
    value: number, timestamp: string, description: string, student: string, subject: string
  }): Promise<IApiServiceResponse<IGrade>>
  {
    return this.send("POST", "grades", data);
  }
}
