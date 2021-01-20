/* 
For any task created, create a new field, prev_progress_log. We reset each
task date created to the corresponding beginning of the week, day or month
Everytime progress is logged, update the prev_progress_log field with the 
reset date of that particular day, week or month
At the start, we set the prev_progress_log to the date created - 1
*/

export class DateMethods {

  static resetToStartOfMonth = (date) => {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
  
  
  static resetToStartOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
  
  
  static resetToStartOfWeek = (date) => {
    const first = date.getDate() - date.getDay();
    const newDate = new Date(date.setDate(first))
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
  
  
  static getPreviousLogDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    return newDate;
  }
  
  
  static getPreviousLogWeek = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 7);
    return newDate;
  }
  
  
  static getPreviousLogMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
  }
  
  
  static resetToStartOfTest = (date) => {
    const newDate = new Date(date);
    const minutes = date.getMinutes();
    minutes % 2 === 0 ? newDate.setMinutes(minutes, 0, 0) : newDate.setMinutes(minutes - 1, 0, 0);
    return newDate;
  }
  
  
  static getPreviousLogTest = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - 2, 0, 0);
    return newDate;
  }


  static resetToStartOfMinute = (date) => {
    const newDate = new Date(date);
    newDate.setSeconds(0, 0);
    return newDate;
  }


  static getPreviousLogMinute = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - 1, 0, 0);
    return newDate;
  }

  static getPreviousLog = (frequency, date) => {
    // switch (frequency) {
    //   case "Daily":
    //     return this.getPreviousLogDay(date);

    //   case "Weekly":
    //     return this.getPreviousLogWeek(date);

    //   case "Monthly":
    //     return this.getPreviousLogMonth(date);
    // }
    return this.getPreviousLogMinute(date);
  }

  static resetToStart = (frequency, date) => {
    // switch (frequency) {
    //   case "Daily":
    //     return this.resetToStartOfDay(date);

    //   case "Weekly":
    //     return this.resetToStartOfWeek(date);

    //   case "Monthly":
    //     return this.resetToStartOfMonth(date);
    // }
    return this.resetToStartOfMinute(date);
  }

  static getDateFormat = (dateObj) => {
    const date = new Date(dateObj);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); 
    let yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }
}