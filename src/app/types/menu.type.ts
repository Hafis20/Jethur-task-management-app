export type Menu = MenuItem[]

export interface MenuItem {
    id: number;
    title: string;
    routerLink: string;
    icon?: string;
}