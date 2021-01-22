// initialize the Task schema
const Task = require("./models/task");

//initialize socket
const socketManager = require("./server-socket");

class UpdateTasks {

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
    switch (frequency) {
      case "Daily":
        return this.getPreviousLogDay(date);

      case "Weekly":
        return this.getPreviousLogWeek(date);

      case "Monthly":
        return this.getPreviousLogMonth(date);
    }
    // return this.getPreviousLogMinute(date);
  }

  static resetToStart = (frequency, date) => {
    switch (frequency) {
      case "Daily":
        return this.resetToStartOfDay(date);

      case "Weekly":
        return this.resetToStartOfWeek(date);

      case "Monthly":
        return this.resetToStartOfMonth(date);
    }
    // return this.resetToStartOfMinute(date);
  }

  
  static update = () => {
    Task.find({is_completed: false}).then(tasks => {
      for (let task of tasks) {
        const currentPeriod = this.resetToStart(task.frequency, new Date());
        const currentPeriodPrev = this.getPreviousLog(task.frequency, currentPeriod);

        if (currentPeriodPrev.toString() !== task.previous_progress_log) {
          task.progress = task.progress.concat([0])
          task.previous_progress_log = currentPeriodPrev.toString();

          if (task.progress.length === task.duration) {
            task.is_completed = true;
            task.date_completed = new Date().toString();
          }
          task.save();
        }
      }
      socketManager.getIo().emit("update_current_tasks", true);
    })
  }
}

module.exports = UpdateTasks;