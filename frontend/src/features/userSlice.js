import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList:[],
    connectionList:[],
  };

  export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
           
            state.userList=[action.payload];
        },
        profileRedux:(state,action)=>{
        
          state.userList[0].firstname=action.payload.firstname;
          state.userList[0].phone=action.payload.phone;
         
        },
        aboutRedux:(state,action)=>{
           state.userList[0].bio=action.payload.bio;
        },
        AddskillRedux:(state,action)=>{

        state.userList[0].skills.push(action.payload)
        },
        AddcertiRedux:(state,action)=>{
          state.userList[0].certification
          .push(action.payload) 
        },
        AddexpRedux:(state,action)=>{
          state.userList[0].experience
          .push(action.payload)
        },
        AddeduRedux:(state,action)=>{
          state.userList[0].education
          .push(action.payload)
        },
        editCertiRedux:(state,action)=>{
        
            const cert=JSON.parse(JSON.stringify(state.userList[0].certification));
          
          const index=cert
          .findIndex((post)=>post.id===action.payload.id);
        
          state.userList[0].certification[index].skill=action.payload.skill;
          state.userList[0].certification[index].provider=action.payload.provider;

        },
        deletecertiRedux:(state,action)=>{
          const cert=JSON.parse(JSON.stringify(state.userList[0].certification));
     
        const index=cert
        .findIndex((post)=>post.id===action.payload.id);
     
        state.userList[0].certification.splice(index, 1);
        },
        editExpRedux:(state,action)=>{
          const cert=JSON.parse(JSON.stringify(state.userList[0].experience));
        
          const index=cert
          .findIndex((post)=>post.id===action.payload.id);
        

          state.userList[0].experience[index].cName=action.payload.cName;
          state.userList[0].experience[index].title=action.payload.title;
          state.userList[0].experience[index].type=action.payload.type;
          state.userList[0].experience[index].startDate=action.payload.startDate;
          state.userList[0].experience[index].endDate=action.payload.endDate;
          state.userList[0].experience[index].month=action.payload.month;
          state.userList[0].experience[index].year=action.payload.year;

        },
        deleteExpRedux:(state,action)=>{
          const cert=JSON.parse(JSON.stringify(state.userList[0].experience));
       
        const index=cert
        .findIndex((post)=>post.id===action.payload.id);
      
        state.userList[0].experience.splice(index, 1);
        },
        editEduRedux:(state,action)=>{
          const cert=JSON.parse(JSON.stringify(state.userList[0].education));
           
          const index=cert
          .findIndex((post)=>post.id===action.payload.id);
         
          state.userList[0].education[index].institute=action.payload.institute;
          state.userList[0].education[index].degree=action.payload.degree;
          state.userList[0].education[index].startDate=action.payload.startDate;
          state.userList[0].education[index].endDate=action.payload.endDate;
          state.userList[0].education[index].desc=action.payload.desc;
        },
        deleteEduRedux:(state,action)=>{
          const cert=JSON.parse(JSON.stringify(state.userList[0].education));
        
        const index=cert
        .findIndex((post)=>post.id===action.payload.id);
        
        state.userList[0].education.splice(index, 1);
        },
        deleteSkillRedux:(state,action)=>{
          const index=state.userList[0].skills.findIndex((post)=>post===action.payload);
          state.userList[0].skills.splice(index, 1);
        },
        connectionRedux:(state,action)=>{
          state.connectionList=[action.payload]
        },
        ConnRemoveRedux:(state,action)=>{
          const index=state.connectionList[0].connection.findIndex((post)=>post.id===action.payload.id);
          state.connectionList[0].connection.splice(index, 1);
        },
        ConnAddRedux:(state,action)=>{
        state.connectionList[0].removed.push(action.payload);
        },
        RemoveRedux:(state,action)=>{
          const index=state.connectionList[0].removed.findIndex((post)=>post.id===action.payload.id);
          state.connectionList[0].removed.splice(index, 1);
        },
        AddRedux:(state,action)=>{
          state.connectionList[0].connection.push(action.payload);
          },
          imageRedux:(state,action)=>{
            state.userList[0].image=action.payload.image;
          }
   }


  });

  export const  {loginRedux,profileRedux,aboutRedux,AddskillRedux,AddcertiRedux,AddexpRedux,AddeduRedux,editCertiRedux,deletecertiRedux,editExpRedux,deleteExpRedux,editEduRedux,deleteEduRedux,deleteSkillRedux,connectionRedux,ConnRemoveRedux,ConnAddRedux,AddRedux,RemoveRedux,imageRedux}=userSlice.actions;
  export default userSlice.reducer;