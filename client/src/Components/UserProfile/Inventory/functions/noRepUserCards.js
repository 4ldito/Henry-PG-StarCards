



export default function(userCards){
   let notRepeated = {};
    userCards.forEach((e)=>{
        if(!notRepeated[e.name]){
            notRepeated = {...notRepeated,[e.name]:{card:e, repeat:1}};
        }else{
            
            notRepeated[e.name].repeat++;
        }
    });
    console.log(notRepeated);
    
    // let notRepeated =noRuserCards.reduce
    return notRepeated;
}