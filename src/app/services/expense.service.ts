import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Category from '../types/Categoty';
import { Expense } from '../types/Expense';
import { BASE_URL } from './BaseUrl';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  public expenseStatusSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  addExpense(expenseData: Expense) {
    return this.httpClient.post(`${BASE_URL}/user/add-expense`, expenseData);
  }
  getCategoryForUser(userId: any) {
    return this.httpClient.get(`${BASE_URL}/user/get-category/${userId}`)
  }

  getRecentlyAddedExpense(userId: string) {
    return this.httpClient.get(`${BASE_URL}/user/get-latest-expense/${userId}`)
  }
  getExpenseYearly(year: number, userId: string) {
    return this.httpClient.get(`${BASE_URL}/user/get-expend-yearly/${userId}/${year}`)
  }
  getExpensesMonthly(year: number, userId: string, month: number) {
    return this.httpClient.get(`${BASE_URL}/user/get-expend-monthly/${userId}/${year}/${month}`)
  }
  getExpensesToday(userId: string, date: string) {
    return this.httpClient.get(`${BASE_URL}/user/get-expend-today/${userId}/${date}`)
  }
  addCategoryToUser(userId: string, data: Array<Category>) {
    return this.httpClient.post(`${BASE_URL}/user/update-category/${userId}`, data);
  }
  deleteUserCategory(userId: string, catName: string) {
    return this.httpClient.delete(`${BASE_URL}/user/delete/${userId}/${catName}`);
  }
  getExpenseUserPaginated(userId:string,date:string,operation:string,page:number){
    return this.httpClient.get(`${BASE_URL}/user/expense-user-paginated/${userId}/${date}/${operation}?pageNo=${page}`);
  }
  updateExpense(userId:string,expId:string,data:Expense){
    return this.httpClient.post(`${BASE_URL}/user/update-expense/${userId}/${expId}`,data)
  }
  deleteExpense(userId:string,expId:string){
    return this.httpClient.delete(`${BASE_URL}/user/delete-expense/${expId}/${userId}`)
  }
}
