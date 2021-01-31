import moment from "moment";

export class DateMethods {

  static resetToStartOfMonth = (date) => {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
  
  static resetToStartOfWeek = (date) => {
    const first = date.getDate() - date.getDay();
    const newDate = new Date(date.setDate(first))
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
  

  static resetToStartOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }


  static resetToStartOfMinute = (date) => {
    const newDate = new Date(date);
    newDate.setSeconds(0, 0);
    return newDate;
  }


  static getPreviousLogMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
  }

  
  static getPreviousLogWeek = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 7);
    return newDate;
  }


  static getPreviousLogDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    return newDate;
  }
  

  static getPreviousLogMinute = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - 1, 0, 0);
    return newDate;
  }


  static getMissedLogMonths = (prev_log) => {
    const current_month_date = moment(this.resetToStartOfMonth(new Date()));
    const prev_log_month_date = moment(new Date(prev_log));
    return current_month_date.diff(prev_log_month_date, "months") - 1;
  }


  static getMissedLogWeeks = (prev_log) => {
    const current_week_date = moment(this.resetToStartOfWeek(new Date()));
    const prev_log_week_date = moment(new Date(prev_log));
    return current_week_date.diff(prev_log_week_date, "weeks") - 1;
  }


  static getMissedLogDays = (prev_log) => {
    const current_day_date = moment(this.resetToStartOfDay(new Date()));
    const prev_log_day_date = moment(new Date(prev_log));
    return current_day_date.diff(prev_log_day_date, "days") - 1;
  }


  static getMissedLogMinutes = (prev_log) => {
    const current_minute_date = moment(this.resetToStartOfMinute(new Date()));
    const prev_log_minute_date = moment(new Date(prev_log));
    return current_minute_date.diff(prev_log_minute_date, "minutes") - 1;
  }


  static getPreviousLog = (frequency, date) => {
    switch (frequency) {
      case "Minute": 
        return this.getPreviousLogMinute(date);
        
      case "Daily":
        return this.getPreviousLogDay(date);

      case "Weekly":
        return this.getPreviousLogWeek(date);

      case "Monthly":
        return this.getPreviousLogMonth(date);
    }
  }


  static resetToStart = (frequency, date) => {
    switch (frequency) {
      case "Minute":
        return this.resetToStartOfMinute(date);

      case "Daily":
        return this.resetToStartOfDay(date);

      case "Weekly":
        return this.resetToStartOfWeek(date);

      case "Monthly":
        return this.resetToStartOfMonth(date);
    }
  }


  static getMissedLogs = (frequency, date) => {
    switch (frequency) {
      case "Minute": 
        return this.getMissedLogMinutes(date);
        
      case "Daily":
        return this.getMissedLogDays(date);

      case "Weekly":
        return this.getMissedLogWeeks(date);

      case "Monthly":
        return this.getMissedLogMonths(date);
    }
  }


  static getDateFormat = (dateObj) => {
    const date = new Date(dateObj);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); 
    let yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }


  static getPrettyDateFormat = (dateObj) => {
    const date = new Date(dateObj);

    let monthNames =["January","February","March","April",
                      "May","June","July","August",
                      "September", "October","November","December"];

    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth();

    return `${monthNames[month]} ${day}, ${year}`;
  }
}