require('../gym_managment/main')
const temp = require("../gym_managment/server/schema/model")

// const getData = async() =>

const deleteAndUpdate = async(id) => {
 
const data = await temp.findByIdAndDelete(id)
// const count = await temp.countDocument({bloodGruop:'B Positive'})
}

deleteAndUpdate('5eb82093e6697d44a4f3fd83').then(console.log("Deleted"))
.catch((e)=>{
    console.log(e);
})