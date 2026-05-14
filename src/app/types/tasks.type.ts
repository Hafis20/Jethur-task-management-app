export interface Task {
    id: string;
    title: string;
    description: string;
    assignee: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
}

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';


export interface TaskWithComment extends Task {
    comments:any[]
}