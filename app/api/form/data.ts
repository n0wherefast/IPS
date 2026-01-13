const dateMin =  () => {
  const today =  new Date().toJSON().slice(0,10)
  return  today
}
const dateMax =  () => {
  const today =  new Date().toJSON().slice(0,4)
  const n = Number(today)+2
  const nn = n.toString()
  return  new Date(nn).toJSON().slice(0,10)
}


export const refForm = [
    {
        id:'name',
        name:'Name',
        type:'text'
      },
      {
        id:'date',
        name:'Date',
        type:'date',
        min: dateMin(),
        max: dateMax()
      },
      {
        id:'time',
        name:'Time',
        type:'time'
      },
      {
        id:'phone',
        name:'Phone',
        type:'tel'
      },
      {
        id:'email',
        name:'Email',
        type:'email'
      },
      {
        id:'address',
        name:'Address',
        type:'text'
      },
      {
        id:'number of adults',
        name:'numberOfAdults',
        type:'number',
        min:'0'
      },
      {
        id:'number of kids under 6-12',
        name:'numberOfKidsUnder',
        type:'number',
        min:'0'
      },
      
  ]