



export default function(userCards){
    const notRepeated = {};
    userCards.map((e)=>{
        if(!notRepeated.includes()){
            notRepeated = [{...notRepeated,[e.name]:{name:e.name, repeat:1}}]
        }else{
            notRepeated = [...notRepeated,[e.name].repeat + 1]
        }
    });
}