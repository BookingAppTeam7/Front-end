export interface UserReport{
    id?:number;
    userThatReportsId:String;
    userThatIsReported:String; 
    reason:String;
}