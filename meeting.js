const db = require("../index.js");
const token = require('../token.json');
const axios = require('axios');
const nodemailer = require('nodemailer');
const ical = require('ical-generator');
const {createEvent} = require('ics');
const {Sequelize, QueryTypes} = require("sequelize");
const bcrypt = require("bcryptjs");
const Op = Sequelize.Op;
const Meet = db.meeting;
const User= db.user;
const Email=db.email; 
const moment = require('moment-timezone');
const Avail = db.availability;
const Event=db.event;
const SERVER =require("../config/server.js")
const express = require('express')
const app = express()
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const querystring = require('querystring');

const { utcToZonedTime, formatInTimeZone } = require('date-fns-tz');
// let mylink;
// let globalMeetLink = null;
exports.event = async(req, res) => {
     const {name,host,email,day,date,notes,timeSlot,endTimeSlot,guestList,location,timezone,duration,eventName} =req.body
     console.log(name,host,email,day,date,notes,timeSlot,endTimeSlot,guestList,location,timezone);
  // Define the date string

  function extractDate(isoDateString) {
    const date = parseISO(isoDateString);
    return format(date, 'yyyy-MM-dd'); // Extract only the date part
}

// Example date string (input format "May 21, 2024")
const dateString = date;

// Convert to ISO string and then extract date
const isoDateString = new Date(dateString).toISOString();
const dbDate = extractDate(isoDateString);
// console.log('Extracted Date:', dbDate); // Should output: '2024-05-21'

// const duration_info=await  Event.findAll({ where: { event_name: event_name } })

// console.log(duration_info,"info of the duration is ==>>")

// Create a Date object from the date string
// Define the date string
// console.log(date,"date is ")
// const mdate = new Date(Date.parse(date + 'T00:00:00Z'));
// console.log(mdate,"date is ")
//     // Check if the Date object is valid
//     if (isNaN(mdate)) {
//         throw new Error('Invalid date');
//     }

//     // Adjust the date by subtracting 5 hours and 30 minutes
//     mdate.setUTCHours(mdate.getUTCHours() - 5);
//     mdate.setUTCMinutes(mdate.getUTCMinutes() - 30);

//     // Format the date to ISO 8601 string
//     const formattedDate = mdate.toISOString();

//     return formattedDate; 



    //  function convertToGoogleCalendarFormat(dateString, timeString) {
    //   console.log(timeString,"coming timestring is ")
    //   // Parse the date and time strings
    //   const date = new Date(dateString);
    //   const timeParts = timeString.split(':');
    //   const hours = timeParts[0];
    //   const minutes = timeParts[1];
    
    //   // Set the time components to the date object
    //   date.setHours(hours);
    //   date.setMinutes(minutes);
    
    //   // Format the date to the required format
    //   const formattedDate = date;
    //   console.log(formattedDate,"formatted date ===>>")
    
    //   return formattedDate;
    // }
    // console.log(date,"date is ====>>>>>")

    // const StartDateTime = convertToGoogleCalendarFormat(date, timeSlot);
    // const EndDateTime = convertToGoogleCalendarFormat(date, endTimeSlot);
    // console.log( StartDateTime,EndDateTime)



    //  const accessToken = token.access_token;
    //  console.log(accessToken,"access token is ===>>")
    //  const config = {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // };
    // const event={
    //   summary: "Meeting with Manpreet Singh ",
    //   description: `One To One Meeting\n\nImportant Note:- ${notes} `,
    //   start: {
    //   dateTime: StartDateTime,
    //     timeZone: timezone
    //   },
    //   end: {
    //     dateTime: EndDateTime,
    //     timeZone: timezone
    //   },
    //  location: location,
    //  attendees:guestList.split(',').map(item => ({ email: item.trim() })),
    //   reminder: { 
    //     useDefault: false,
    //     overrides: [
    //       {method: "email", minutes: 30},
    //       {method: "popup", minutes: 10}
    //     ]
    //   },
    // colorId: "1",
   
    // }
    var list;
    if(guestList.length<=0){
list=null;
    }
    else{
      list=guestList
    }



    

    const info=await  User.findAll({ where: { username: host } })
    const user_id= info[0].id;

 const meeting=   await Meet.create({
      host:host,
      date:date,
      custom_date:dbDate,
      day: day,
      timezone:timezone,
      time:timeSlot,
      lead_name:name,
      lead_email:email,
      guest_email:list,
      location:location,
      notes:notes,
      duration:duration,
      time_slot:endTimeSlot,
      user_id:user_id,
      eventName:eventName,
    })
    
     .then((data)=>{
      console.log(data,"data ----->>")
     })

    const globalMeetLink=await  myGoogleLink(email)
    console.log(globalMeetLink,"link is ??==>>")


   const zoom= exampleFunction();
   console.log(zoom,"zoom meeting ===>>>>")
  // .then((meetLink) => {
  //   console.log('Meet link is:', meetLink);
 
  // })
  // .catch((error) => {
  //   console.error('Error creating meet link:', error);
  // });
    // console.log(mylink,"my link =====>>")
    // console.log(mylink,"my generated link is ==>>")
/// Format date and time with moment-timezone
const startTime = moment.tz(`${dbDate} ${timeSlot}`, 'YYYY-MM-DD HH:mm', timezone);

// Calculate end time based on duration
const endTime = startTime.clone().add(Number(duration.replace('hr', '')), 'hours');

// Define event details using form data
const event = {
  start: startTime.utc().format('YYYY-M-D-H-m').split('-').map(Number),
  end: endTime.utc().format('YYYY-M-D-H-m').split('-').map(Number),
  summary: 'Meeting with ' + host,
  description: notes,
  location: location,
  organizer: {
    name: host,
    email: 'ruhiequasar@gmail.com' // Change this to the actual organizer email
  },
  title: 'Meeting with ' + host // Explicitly set the title
};

    
   
   // Create the iCalendar content
// Create the iCalendar content
createEvent(event, (error, value) => {
  if (error) {
    console.error('Error creating iCalendar event:', error);
    return;
  }

// Convert UTC start and end times to local time zone for display in email body
const localStartTime = startTime.clone().tz(timezone).format('YYYY-MM-DD HH:mm z'); 
const localEndTime = endTime.clone().tz(timezone).format('YYYY-MM-DD HH:mm z'); 


const emailBody = `
  <p>You are invited to a meeting.</p>

  <p><strong>Details:</strong></p>
  <ul>
    <li><strong>Summary:</strong> ${event.title}</li>
    <li><strong>Description:</strong> ${event.description}</li>
    <li><strong>Location:</strong> ${event.location}</li>
    <li><strong>Start Time:</strong> ${localStartTime}</li>
    <li><strong>End Time:</strong> ${localEndTime}</li>
  </ul>

  <p>To join the video meeting, click this link: <a href="${globalMeetLink}">Join Google Meet</a></p>
  <p>Otherwise, to join by phone, dial +1 803-999-3544 and enter this PIN: 553 944 424#</p>
  <p>To view more phone numbers, click this link: <a href="https://tel.meet/ybu-bypy-igw?hs=5">View Phone Numbers</a></p>

  <p>Please find the meeting invitation attached.</p>
`;


  // Attach the iCalendar content to the email
  sendEmailWithCalendar(value, emailBody);
});


// Function to send email with calendar attachment
function sendEmailWithCalendar(icsContent,emailBody) {
  // Create Nodemailer transporte
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ruhiequasar@gmail.com',
      pass: 'bklt mqwa zrpc exoz'
    }
  });

  // Define email options
  //Define email options
  const mailOptions = {
    from: 'ruhiequasar@gmail.com',
    to: email,
    subject: 'Invitation to Meeting with ' + event.organizer.name,
    html: emailBody,
    attachments: [
      {
        filename: 'meeting.ics',
        content: icsContent // Attach the iCalendar content here
      }
    ]
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
           res.status(200).send({
        Success: meeting
       
      });
    }
  });

}




 

  // //  //////Hitting The Calendar Api//////////////////////
  // //     axios.post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`,event,config)
  // //     .then((data)=>{
        
  // //      // console.log(data)
  // //      res.status(200).send({
  // //        Success: data.data.htmlLink
        
  // //      });
   
  // //     })
  //   })





 
   


     
      

  };


  
  const countries = require('i18n-iso-countries');
  
  // Define region mappings
  const regionMappings = {
    Africa: ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RE', 'RW', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW'],
    Asia: ['AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MO', 'MY', 'MV', 'MN', 'MM', 'NP', 'KP', 'OM', 'PK', 'PS', 'PH', 'QA', 'SA', 'SG', 'KR', 'LK', 'SY', 'TW', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'],
    Europe: ['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FO', 'FI', 'FR', 'DE', 'GI', 'GR', 'GG', 'HU', 'IS', 'IE', 'IM', 'IT', 'JE', 'LV', 'LI', 'LT', 'LU', 'MK', 'MT', 'MD', 'MC', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SJ', 'SE', 'CH', 'UA', 'GB', 'VA'],
    NorthAmerica: ['AG', 'BS', 'BB', 'BZ', 'CA', 'CR', 'CU', 'DM', 'DO', 'SV', 'GD', 'GT', 'HT', 'HN', 'JM', 'MX', 'NI', 'PA', 'KN', 'LC', 'VC', 'TT', 'US'],
    SouthAmerica: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'],
    Oceania: ['AS', 'AU', 'CK', 'FJ', 'PF', 'GU', 'KI', 'MH', 'FM', 'NR', 'NC', 'NZ', 'NU', 'NF', 'MP', 'PW', 'PG', 'PN', 'WS', 'SB', 'TK', 'TO', 'TV', 'UM', 'VU', 'WF'],
  };
  
  exports.Timezone = async (req, res) => {
    try {
      const timesByRegion = {};
  
      for (const region in regionMappings) {
        timesByRegion[region] = {};
  
        for (const countryCode of regionMappings[region]) {
          const countryName = countries.getName(countryCode, 'en');
          const timeZones = moment.tz.zonesForCountry(countryCode);
  
          if (timeZones.length > 0) {
            for (const timeZone of timeZones) {
              const currentTime = moment.tz(timeZone).format('HH:mm');
              timesByRegion[region][timeZone] = currentTime;
            }
          }
        }
      }
  
      res.json(timesByRegion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
///////////////////////////////////List Of timeSlots on the basis of Timezone and the Date ////
// Use your appropriate database client
const { parseISO, addHours, format } = require('date-fns');



//////////////////////////////Admin Panel Data //////////////////////////////

////////////////Add Employee /////////////////
exports.User=async(req,res)=> {
  const {first_name,last_name,email,password,confirm_password,phone}=req.body;
   console.log(req.body)
  const hashedpass = await bcrypt.hash(password, 8);
  if(!first_name || !last_name || !email || !password || !confirm_password || !phone)
    {
     
      res.status(400).send({
        errors: [{ message: "All Fields are required!" }],
      });
  }
0
  if (password !== confirm_password) {
    // If they don't match, send a response with a 400 status code and an error message
    res.status(400).send({
      errors: [{ message: "Password and Confirm Password doesn't match!" }],
    });
}
  
    User.findAll({ attributes: ["email"], where: { email: email } })
    .then((data) => {
      if (data.length > 0) {
        res.status(400).send({
          errors: [{ message: "User already Exist!" }],
        });
      } else {
        const username = email.split('@')[0];
        User.create({
          first_name:first_name,
          last_name:last_name,
          email: email,
          password: hashedpass,
          username:username,
          phone:phone
        })
        .then((data) => {
          res.status(200).send({
            success: "User has been Created!",
            data,  
          })
        })

      
    }
  })
    .catch((err) => {
      console.log(err);
    });
  }


////////////////Add Email Body /////////////////



exports.Email=async(req,res)=> {
  const {subject,body,user_id}=req.body;
   console.log(req.body)

  if(!subject || !body)
    {
     
      res.status(400).send({
        errors: [{ message: "All Fields are required!" }],
      });
  }

  
    const result= Email.findAll({ where: { user_id: user_id } });
    if(result.length>0){
      await Email.update(
        {
          subject:subject,
          body:body,
        },
        {
          where: {
            user_id:user_id 
            
          },
        }).then((data)=>{
          res.status(200).send({
                      success: "Email has been Created!",
                      data,
                    })
        }).catch((err) => {
              console.log(err);
            });

    }
    else{
      Email.create({
                subject:subject,
                body:body,
                user_id:user_id,
               
              }).then((data)=>{
                res.status(200).send({
                            success: "Email has been Created!",
                            data,
                          })
              }).catch((err) => {
                console.log(err);
              });
  
    }
  
   }


//////////////////////availability///////////////////



exports.availability=async(req,res)=>{
const{currentUserTimezone,filteredAvailabilities,uid}=req.body;

const availableDays=await  Avail.findAll({ where: { user_id: uid,timezone:currentUserTimezone } })
if(availableDays.length>0){
  try {
    // Delete existing availability entries
    await Avail.destroy({ where: { user_id: uid, timezone: currentUserTimezone } });
    console.log('Existing availability entries deleted.');
  } catch (error) {
    console.error('Error deleting existing availability entries:', error);
  }
}
const availabilityData = [];
  
filteredAvailabilities.forEach(availability => {
    availability.slots.forEach(slot => {
      availabilityData.push({
        day: availability.day,
        start_time: slot.startTime,
        end_time: slot.endTime,
        timezone:currentUserTimezone,
        user_id:uid,
      });
    });
  });

  try {
    const savedAvailabilities = await Avail.bulkCreate(availabilityData);
    res.status(201).json(savedAvailabilities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save availabilities' });
  }
}

////////////////////////////////////////////////////////////////////

exports.new=async(req,res)=>{
  const{event_name,user_id,duration,location}=req.body;

console.log(req.body,"req which is coming is ==>>")
  const check= await Event.findAll({where:{ user_id: user_id ,event_name:event_name}})
  console.log(check,"check ==>>")

  if(check.length>0){
    res.status(400).send({
      errors: [{ message: "Event Already Created!" }],
    });

  }
  else{

    const userData=await User.findAll({  where: { id: user_id } })
    console.log(userData,"data of the user is ==>")
     const name= userData[0].first_name+" "+userData[0].last_name
     const email=userData[0].email;
     const username = email.split('@')[0];
   
   
   
   
       const date = new Date();
       const year = date.getFullYear();
       const month = date.toLocaleString('default', { month: 'long' });
      
   console.log(check,"check===>>")
   
     console.log(name,email,username)
     console.log(SERVER.SERVER,"server is ===>> ")
     const server=SERVER.SERVER;
   
   // const url = `${SERVER.SERVER}/${username}/${event_name}/${year}/${month}`
    const url = `${server}/${username}/${event_name}/${year}/${month}/${duration}`
   console.log(url,"generated url is ==>")
   await   Event.create({
     name:name,
     email:email,
     username:username,
     user_id:user_id,
     event_name:event_name,
     duration:duration,
     location:location,
    url :url
    
   }).then((data)=>{
     res.status(200).send({
                 success: "Event has been Created!",
                 data,url
               })
   }).catch((err) => {
     console.log(err);
   });
   
    
  }

  
}



 exports.datesAvailable=async(req,res)=>{
 const{username,timezone}=req.body;

const info=await  User.findAll({ where: { username: username } })
const user_id= info[0].id;


const availableDays=await  Avail.findAll({ attributes: ["day"], where: { user_id: user_id,timezone:timezone } })
const daysArray = availableDays.map(availability => availability.dataValues.day);
console.log(daysArray,"array ====>>>")
 res.status(200).send({
              success: "Available days are Fetched!",
              daysArray
            })

 }

 exports.timezoneChange=async(req,res)=>{

// console.log(req.body);
const{username,timezone}=req.body;

const info=await  User.findAll({ where: { username: username } })
const user_id= info[0].id;



const availableInfo=await  Avail.findAll({ attributes:["day","start_time","end_time","timezone"], where: { user_id: user_id } })
console.log(availableInfo,"info ===>")
// const daysArray = availableDays.map(availability => availability.dataValues.day);
const initialTimezone=availableInfo[0].timezone;
const clientAvailability = availableInfo.map(availability => availability.dataValues);











const convertAvailability = (availability, targetTimezone) => {
  return availability.map(slot => {
    const { day, start_time, end_time, timezone } = slot;

    // Parse start and end times with the day
    const startDateTime = moment.tz(`${day} ${start_time}`, 'ddd HH:mm', timezone);
    const endDateTime = moment.tz(`${day} ${end_time}`, 'ddd HH:mm', timezone);

    // Convert to the target timezone
    const startConverted = startDateTime.clone().tz(targetTimezone);
    const endConverted = endDateTime.clone().tz(targetTimezone);

    // Format the output with the new day and time
    return {
      day: startConverted.format('ddd'), // Convert to the new day
      start_time: startConverted.format('HH:mm'),
      end_time: endConverted.format('HH:mm'),
      timezone: targetTimezone
    };
  });
};

// Define your target timezone, e.g., 'America/Toronto'
const targetTimezone = timezone;

// Convert client availability to target timezone
const convertedAvailability = convertAvailability(clientAvailability, targetTimezone);

console.log(convertedAvailability);
const daysArray = convertedAvailability.map(availability => availability.day);
console.log(daysArray,"converted days are ==>")
res.status(200).send({
  success: "Converted Available days are Fetched!",
  daysArray
})
 }
 

 const convertAvailability = (availability, targetTimezone) => {

      return availability.map(slot => {
        const { day, start_time, end_time, timezone } = slot;
    
        // Parse start and end times with the day
        const startDateTime = moment.tz(`${day} ${start_time}`, 'ddd HH:mm', timezone);
        const endDateTime = moment.tz(`${day} ${end_time}`, 'ddd HH:mm', timezone);
    
        // Convert to the target timezone
        const startConverted = startDateTime.clone().tz(targetTimezone);
        const endConverted = endDateTime.clone().tz(targetTimezone);
    
        // Format the output with the new day and time
        return {
          day: startConverted.format('ddd'), // Convert to the new day
          start_time: startConverted.format('HH:mm'),
          end_time: endConverted.format('HH:mm'),
          timezone: targetTimezone
        };
      });
    };
 exports.storedAvailability=async(req,res)=>{
// console.log(req.body);
const{user_id,timezone}=req.body;2
console.log(req.body ,"coming body is ===>>")

// const info=await  User.findAll({ where: { username: username } })
// const user_id= info[0].id;

let clientAvailability;
const infoWithoutTimezone=await  Avail.findAll({ attributes:["day","start_time","end_time","timezone"], where: { user_id: user_id } })
const availableInfo=await  Avail.findAll({ attributes:["day","start_time","end_time","timezone"], where: { user_id: user_id,timezone:timezone } }).then((data)=>
{


  const Availability = data.map(availability => availability.dataValues);
  console.log(Availability,"availability is ")

  if(Availability.length>0){
    clientAvailability=Availability;  
    res.status(200).send({
      success: "Available days are Fetched!",
      clientAvailability})
    
     
    
    }
    else{
    
      console.log("in else block=====>>")
      
      
      const convertedAvailability = convertAvailability(infoWithoutTimezone, timezone);
    console.log(convertedAvailability,"converted availabilities are ==>>")
    
    clientAvailability=convertedAvailability
    
    res.status(200).send({
      success: "Available days are Fetched!",
      clientAvailability})
    
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
    



})
 }
// console.log(availableInfo,"info ===>")


// // const daysArray = availableDays.map(availability => availability.dataValues.day);
// const Availability = availableInfo.map(availability => availability.dataValues);

// console.log(clientAvailability,"availability without timezone")


exports.eventList=async(req,res)=>{
const {user_id}= req.body;
  console.log(user_id,"user id is ===>>>>>>>")

const Info=await  Meet.findAll({where: { user_id: user_id} })

res.status(200).send({
  success: "Converted Available days are Fetched!",
  Info
})


  

}



exports.eventsByUser=async(req,res)=>{
const {user_id}=req.body ;
console.log(req.body);
const Info =await  Event.findAll({where:{user_id:user_id}})



res.status(200).send({
  success: "Created Events!",
  Info
})

}


exports.userAccess=async(req,res)=>{
const{username}=req.body;
await User.findAll({ where: {username:username} })
    .then((data) => {
      res.status(200).send({
       data})
      
    }).catch(()=>{
      res.status(400).send({
        errors: [{ message: "No User Found!" }],
      });
    })

}



exports.userEmail=async(req,res)=>{
  console.log(req.body, "body is ==>>")
  const{email}=req.body;
  const data =await User.findAll({ where: {email:email} })

  if(data.length>0){
    res.status(200).send({
      data
    })}
    
    
  
  else{

    res.status(400).send({
          errors: [{ message: "No User Found!" }],
        });
      

  }
}
      // .then((data) => {
      //   res.status(200).send({
      //    data})
        
      // }).catch(()=>{
      //   res.status(400).send({
      //     errors: [{ message: "No User Found!" }],
      //   });
      // })
  





exports.Timeslots = async (req, res) => {
  const { timezone, date, username,event_name } = req.body;
  const date1 = new Date(date);
  const options = { weekday: 'short' };
  const dayName = date1.toLocaleDateString('en-US', options);
  const info = await User.findAll({ where: { username: username } });
  const user_id = info[0].id;
  console.log(info,"info is ==>>")

  const availableSlotzs = await Avail.findAll({
      attributes: ['start_time', 'end_time'],
      where: {
          user_id: user_id,
          timezone: timezone,
          day: dayName
      },
      group: ['start_time', 'end_time']
  });

  const durations = await Event.findAll({
    attributes: ['duration'],
    where: {
        user_id: user_id,
        event_name:event_name
      
    },

});

const duration_to_pass = durations[0].duration;
console.log(durations[0].duration,"durations ===>>>")
  let slotsArray;
  if (availableSlotzs.length > 0) {
      slotsArray = availableSlotzs.map(availability => availability.dataValues);
  } else {
      const availableInfo = await Avail.findAll({
          attributes: ["day", "start_time", "end_time", "timezone"],
          where: { user_id: user_id }
      });
      const clientAvailability = availableInfo.map(availability => availability.dataValues);

      const convertAvailability = (availability, targetTimezone) => {
          return availability.map(slot => {
              const { day, start_time, end_time, timezone } = slot;
              const startDateTime = moment.tz(`${day} ${start_time}`, 'ddd HH:mm', timezone);
              const endDateTime = moment.tz(`${day} ${end_time}`, 'ddd HH:mm', timezone);
              const startConverted = startDateTime.clone().tz(targetTimezone);
              const endConverted = endDateTime.clone().tz(targetTimezone);

              return {
                  day: startConverted.format('ddd'),
                  start_time: startConverted.format('HH:mm'),
                  end_time: endConverted.format('HH:mm'),
                  timezone: targetTimezone
              };
          });
      };

      const targetTimezone = timezone;
      const convertedAvailability = convertAvailability(clientAvailability, targetTimezone);
      console.log('Converted Availability:', convertedAvailability); // Debugging line
      slotsArray = convertedAvailability.filter(slot => slot.day === dayName);
  }

  const createDateFromTime = (date, time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      return newDate;
  };


  const getTimeSlots = (slotsArray,duration_to_pass) => {
      const timeSlots = [];
      const currentDate = new Date();

      slotsArray.forEach(slot => {
          const startTime = createDateFromTime(currentDate, slot.start_time);
          let endTime = createDateFromTime(currentDate, slot.end_time);

          if (endTime <= startTime) {
              endTime.setDate(endTime.getDate() + 1);
          }



          
          let currentTime = new Date(startTime);
          while (currentTime < endTime) {
              const hours = currentTime.getHours().toString().padStart(2, '0');
              const minutes = currentTime.getMinutes().toString().padStart(2, '0');
              const timeSlot = `${hours}:${minutes}`;
              timeSlots.push(timeSlot);

              currentTime.setTime(currentTime.getTime() + duration_to_pass * 60 * 1000);
          }
      });

      return timeSlots;
  };



  const timeSlots = getTimeSlots(slotsArray,duration_to_pass);


  console.log('Generated Time Slots:', timeSlots); // Debugging line

  // Determine if the requested date is today
  const isToday = moment(date).isSame(moment(), 'day');

  // Get the current time in the specified timezone
  const currentDate = moment.tz(timezone);
  const currentTime = currentDate.format('HH:mm');


  const slots = await Meet.findAll({
    
    where: {
        user_id: user_id,
        eventName:event_name
      
    },})

    let slots_to_deduct = [];

    if (slots.length > 0) {
        console.log("it is having the slots ==>");
    
        // Using a Set to ensure unique time values
        let timeSet = new Set();
    
        // Loop through the slots and add the `time` values to the Set
        slots.forEach(slot => {
            if (slot.dataValues && slot.dataValues.time) {
                timeSet.add(slot.dataValues.time);
            }
        });
    
        // Convert the Set back to an array
        slots_to_deduct = Array.from(timeSet);
    
        console.log(slots_to_deduct, "Unique time slots are ==>");
    }
    
    // Define a function to filter out the slots_to_deduct
    function deductSlots(timeSlots, slots_to_deduct) {
        return timeSlots.filter(slot => !slots_to_deduct.includes(slot));
    }
    
    // Now filter the available time slots based on the condition
    let deductedTimeslots;
    
    if (isToday) {
        // Filter out past time slots for today and also deduct `slots_to_deduct`
        deductedTimeslots = timeSlots.filter(slot => slot >= currentTime);
    } else {
        // Show all time slots for future dates
        deductedTimeslots = timeSlots;
    }
    
    // Deduct slots_to_deduct from the available slots
    deductedTimeslots = deductSlots(deductedTimeslots, slots_to_deduct);
    
    console.log(deductedTimeslots, "Available time slots after deduction");
    
  res.status(200).json({ data: deductedTimeslots });
};

// const myGoogleLink=async(email)=>{





//   // Load OAuth2 client credentials from 'credentials.json'
//   const SCOPES = ['https://www.googleapis.com/auth/calendar'];
//   const TOKEN_PATH = 'token.json';
  
//   // Load credentials and start the authorization flow
//   fs.readFile('./credentials.json', (err, content) => {
//     console.log(JSON.parse(content),"content is -=======>>>>>>>>>>>>>>>>>>>>")
//     if (err) return console.log('Error loading client secret file:', err);
//     authorize(JSON.parse(content), scheduleMeet);
//   });
  
//   // Create an OAuth2 client and retrieve tokens
//   function authorize(credentials, callback) {
//       // console.log('credentials',credentials)
//     const { client_secret, client_id, redirect_uris } = credentials;
//     const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
//     // Check if token already exists
//     fs.readFile(TOKEN_PATH, (err, token) => {
//       if (err) return getAccessToken(oAuth2Client, callback);
//       oAuth2Client.setCredentials(JSON.parse(token));
//       callback(oAuth2Client);
//     });
//   }
  
//   // Get a new access token if not available
//   function getAccessToken(oAuth2Client) {
//     const authUrl = oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: SCOPES,
//     });
//     console.log('Authorize this app by visiting this url:', authUrl);
//     // const rl = readline.createInterface({
//     //   input: process.stdin,
//     //   output: process.stdout,
//     // });
//     // rl.question('Enter the code from that page here: ', (code) => {
//     //   rl.close();
//     //   oAuth2Client.getToken(code, (err, token) => {
//     //     if (err) return console.error('Error retrieving access token', err);
//     //     oAuth2Client.setCredentials(token);
//     //     // Save token for future use
//     //     fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//     //       if (err) console.error(err);
//     //       console.log('Token stored to', TOKEN_PATH);
//     //     });
//     //     callback(oAuth2Client);
//     //   });
//     // });
//   }
//   app.get('/oauth2callback',async(req,res)=>{
//     // console.log('object',req)
//     fs.readFile('./credentials.json',async (err, content) => {
//         if (err) return console.log('Error loading client secret file:', err);
//         meetLinkGen(JSON.parse(content),req.query.code,scheduleMeet);
//       });
//  })
 
//  function meetLinkGen(credentials,code,callback) {
//     // console.log('credentials',credentials)
//   const { client_secret, client_id, redirect_uris } = credentials;
//   const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
//   const TOKEN_PATH = 'token.json';
 
//   // Check if token already exists
//   oAuth2Client.getToken(code, (err, token) => {
//     if (err) return console.error('Error retrieving access token', err);
//     oAuth2Client.setCredentials(token);
//     // Save token for future use
//     fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//       if (err) console.error(err);
//       console.log('Token stored to', TOKEN_PATH);
//     });
//     callback(oAuth2Client);
//   });
//  }
  
//   // Schedule a Google Meet meeting
//  async function scheduleMeet(auth) {
//     const calendar = google.calendar({ version: 'v3', auth });
//     const currentTime = new Date(Date.now());
//     const halfHourLater = new Date(Date.now() + 30 * 60 * 1000);
//     const event = {
//       summary: 'Google Meet Meeting',
//       description: 'A Google Meet video meeting',
//       start: {
//         dateTime: currentTime,  // Meeting start time
//         timeZone: 'Asia/Kolkata',
//       },
//       end: {
//         dateTime: halfHourLater,  // Meeting end time
//         timeZone: 'Asia/Kolkata',
//       },
//       conferenceData: {
//         createRequest: {
//           requestId: Math.random(),
//           conferenceSolutionKey: {
//             type: "hangoutsMeet"
//           }
//         }
//       },
//       attendees: [
//         { email: 'gmeetexample@gmail.com' },
//         { email: email }
//       ],
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: 'email', minutes: 24 * 60 },
//           { method: 'popup', minutes: 10 },
//         ],
//       },
//     };
    
  
//  await   calendar.events.insert(
//       {
//         auth: auth,
//         calendarId: 'primary',
//         resource: event,
//         conferenceDataVersion: 1,
//       },
//       (err, res) => {
//         if (err) return console.log('Error creating event:', err);
//         else{
//           const result=res.data?.hangoutLink;

//           console.log(result, "result is =========>>>>>")
//           return result;
//         }
//         // console.log('Event created: %s', res.data.htmlLink);
//         // console.log('Google Meet Link: %s', res.data?.hangoutLink);
//       }
//     );
//   }
//  }


const myGoogleLink = async (email) => {
  const SCOPES = ['https://www.googleapis.com/auth/calendar'];
  const TOKEN_PATH = 'token.json';

  return new Promise((resolve, reject) => {
    // Load credentials and start the authorization flow
    fs.readFile('./credentials.json', (err, content) => {
      if (err) {
        console.log('Error loading client secret file:', err);
        return reject('Error loading client secret file');
      }
      authorize(JSON.parse(content), async (auth) => {
        try {
          const meetLink = await scheduleMeet(auth, email);
          globalMeetLink = meetLink; 
          resolve(meetLink);  // Resolve the promise with the generated link
        } catch (error) {
          console.error('Failed to create the meet link:', error);
          reject(error);  // Reject in case of an error
        }
      });
    });
  });

  // Create an OAuth2 client and retrieve tokens
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if token already exists
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  // Get a new access token if not available
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
  }

  // Schedule a Google Meet meeting and return the meet link
  function scheduleMeet(auth, email) {
    return new Promise((resolve, reject) => {
      const calendar = google.calendar({ version: 'v3', auth });
      const currentTime = new Date(Date.now());
      const halfHourLater = new Date(Date.now() + 30 * 60 * 1000);

      const event = {
        summary: 'Google Meet Meeting',
        description: 'A Google Meet video meeting',
        start: {
          dateTime: currentTime,  // Meeting start time
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: currentTime,  // Meeting end time
          timeZone: 'Asia/Kolkata',
        },
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(), // unique request id
            conferenceSolutionKey: {
              type: "hangoutsMeet"
            }
          }
        },
        attendees: [
          { email: 'gmeetexample@gmail.com' },
          { email: email }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      calendar.events.insert(
        {
          auth: auth,
          calendarId: 'primary',
          resource: event,
          conferenceDataVersion: 1,
        },
        (err, res) => {
          if (err) {
            console.log('Error creating event:', err);
            reject(err);  // Reject the promise in case of an error
          } else {
            const result = res.data?.hangoutLink;
            console.log(result, "Meet link generated successfully.");
            resolve(result);  // Resolve the promise with the Google Meet link
          }
        }
      );
    });
  }
};
//////////////////////////////////////////////////ZOOM MEETING///////////////////////////////////////////

const clientID = 'fVUKxcERECyXwVpB8zbQ';
const clientSecret = 'egOI8gyfErOM0TK3JZHm2jd9SNqUnvEB';
const redirectUri = 'https://mern.equasar.com/oauth/callback'; 



// const clientID = 'fVUKxcERECyXwVpB8zbQ';
// const clientSecret = 'egOI8gyfErOM0TK3JZHm2jd9SNqUnvEB';
// const redirectUri = 'https://mern.equasar.com/oauth/callback';

// Function to generate the Zoom OAuth authorization URL
const getZoomAuthURL = () => {
  return 'https://zoom.us/oauth/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      redirect_uri: redirectUri
    });
};

// Function to handle Zoom OAuth callback and create a meeting
const handleZoomOAuth = async (code) => {
  const tokenURL = 'https://zoom.us/oauth/token';
  const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(tokenURL, querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    }), {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const accessToken = tokenResponse.data.access_token;

    // Create the Zoom meeting
    return await createZoomMeeting(accessToken);

  } catch (error) {
    console.error('Error during OAuth process or meeting creation:', error);
    throw new Error('OAuth or meeting creation failed');
  }
};

// Function to create a Zoom meeting
const createZoomMeeting = async (accessToken) => {
  try {
    const meetingResponse = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'Test Zoom Meeting',
        type: 2, // Scheduled meeting
        start_time: new Date().toISOString(),
        duration: 30,
        timezone: 'Asia/Kolkata',
        settings: {
          host_video: true,
          participant_video: true
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Meeting created:', meetingResponse.data);
    return meetingResponse.data.join_url; // Return the meeting link

  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw new Error('Meeting creation failed');
  }
};

// Unified function to get the Zoom meeting link
const getZoomMeetingLink = async (code) => {
  if (!code) {
    // No code, return OAuth URL to initiate the flow
    return { authUrl: getZoomAuthURL() };
  }

  // Code is available, complete OAuth and create meeting
  try {
    const meetingLink = await handleZoomOAuth(code);
    return { meetingLink }; // Return the meeting link
  } catch (error) {
    throw new Error('Failed to get Zoom meeting link');
  }
};

// API route to initiate scheduling a Zoom meeting
exports.exampleFunction = async (req, res) => {
  const { code } = req.query; // Extract code from request

  try {
    const result = await getZoomMeetingLink(code);

    if (result.authUrl) {
      // If OAuth URL is returned, redirect user to authorize the app
      res.redirect(result.authUrl);
    } else {
      // Meeting link is available, return it to the user
      res.json({ message: 'Meeting created', meetingLink: result.meetingLink });
    }
  } catch (error) {
    res.status(500).send('Error scheduling Zoom meeting');
  }
};

// Define the routes
// app.get('/schedule-meeting', exampleFunction);

// Callback route for Zoom OAuth (this should match your redirectUri)
// app.get('/oauth/callback', exampleFunction);