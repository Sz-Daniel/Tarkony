import EventEmitter from 'eventemitter3';

type LogType ={
    name: string,
    log: any,
}
//For bad days console.log("all",queryClient.getQueryCache().findAll());
/**
 * Closure based logging system with EventEmitter
 * log object is in closure in add.
 * with the IFFE it will created instantly so it just need called with Logger
 */
export const Logger =(()=>{

    const emmitter=new EventEmitter()

    const logs:LogType[] = []

    function add(name:string, log:any){
        logs.push({name, log});
        emmitter.emit("update")
    }
    function clear(){
        logs.length=0;
        emmitter.emit("update")
    }

    function getLogs(): LogType[]{
        return [...logs];
    }
    /**
     * @param callback Trigger the update with emmitter.on so it would use the callback (setLog) 
     * @returns this for useEffect cleanup the emmitter.off <- for now, not neccessary, unmount not really happen in this state of the page
     */
    function onLogUpdate(callback: ()=> void) {
        emmitter.on("update",callback);
        return ()=> {emmitter.off("update", callback);}
    }

    return {
        add,
        clear,
        getLogs,
        onLogUpdate,
    }

})();