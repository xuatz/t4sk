## Application Feature

* it's a todolist that helps you identify your key tasks and keep you focused.
* it reminds you to make sure that the key tasks are completed
* incomplete tasks are archived, and will be offered as suggestion for the task for the next day
* targetting desktop and mobile-web currently, native mobile app in future.

## More details about application

### Application usage strategy

Users are prompted every night to come up with 4 tasks that they want to accomplish tomorrow. They may key in brand new tasks, or pick from their own archive of incompleted tasks and saved future tasks (not sure if we need to split them up or put them in the same catergory)

During the course of the next day, the user is free to add new tasks if necessary.

At the end of the day, there will be a report that shows the user what is the task completion rate. This will be a useful reminder for users on the tasks they had forgotten about, or pushed aside due to other obligation. It can help the users to understand that they had spent their time distracted by other minor task, instead of their main tasks. Users may decide to actively say no in the day, to stay focus on their main tasks.

Finally to complete the cycle, the user will be prompted to create the next 4 tasks for the next day, either completely new ones or from their previous tasks.

### Incomplete tasks

There should be a chao sng(temp name) meter, for how long the task have been overdue (based on created date). Can think about some implementation on how to prod the user on these overdue tasks (make the font bigger? bolded? etc)

### 2 types of tasks

1. immediate task
1. future task

1) immediate task is for when the user decide that there is a new task to be added for today. it should be a quite and easy input, single line with task description, shouldn need anything else. Was thinking this can be a modal screen.

2) future task is for something that needs to be done in the near future, but not today. It helps to free the user from the responsibility to remember it, without losing focus for the day. It will appear as an suggestion during the end of the day report. Maybe we can add a checkbox for the add task dialog, so that default will be immediate, else intended it will become a future task.