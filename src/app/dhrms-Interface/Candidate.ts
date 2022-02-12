export interface ICandidate{
    Firstname: string;
    Lastname: string;
    Userid: number;
    Dateofbirth: Date;
    Email: string;
    Currentaddress: string;
    Permanentaddress: string;
    Contactnumber: string;
    City: string;
    Gender:string;
    RoleId:number;
    Candidateid: number;
    Skillset:string;
    Scheduleddate:Date;
    Scheduledtime:string;
    skilllist:any[];
    Workexperiencedetails:any[];
    Interviewdetails:any;
    Status:string;
    Roundname:string;
    Interviewerid:any;
    
}

export interface Iinterview{
        Candidateid:number;
        Intervievwerid:number;
        Status:string;
        Scheduleddate:Date;
        Attended:string;
        Interviewerfeedback:string;
        Scheduledtime:string;
        Roundname:string;
        Interviewername:string;
        Interviewid:number;

}

