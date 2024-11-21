export const selectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: " A sole travels in exploration",
        icon: "✈️",
        people: "1"
    },
    {
        id: 2,
        title: 'A couple',
        desc: " Two travels in tandem",
        icon: "🎎",
        people: "2 People"
    },
    {
        id: 3,
        title: 'Family',
        desc: " A group offun loving adv",
        icon: "👩‍👩‍👦‍👦",
        people: "3-5 People"
    },
    {
        id: 4,
        title: 'Friends',
        desc: " A bunch of thrill-seekes",
        icon: "🤝",
        people: "5 to 10 People"
    },

]
export const budgetList = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "🪙"
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on average side",
        icon: "💰"
    },
    {
        id: 3,
        title: "Luxry",
        desc: "Dont worry about  costs",
        icon: "💸"
    },


]
// export const ai_prompt = `Generate travel trip for {location} for {days} days for {traveller} with {budget} budget,give me hotel details list with its description,rating ,budget,image url,coordinates,sugeest itinerary with place name , place details,image url,geo coordinates,ticket pricing,rating,best time to travel each of the location for {days} days woth each day plan with best time to visit in JSON format`;
export const ai_prompt = `Generate travel trip for location {location} for  {days} days for {traveller} with a {budget} budget.Give me hotel option lists along  with HotelName,address,price,hotel image url ,geo cordinates,rating, descriptions,And  also suggest itinerary for {days} days  with placeName,Place Details,Place image url,geo coordinates,ticket pricing, best time to travel each of the location for {days} days with each day plan with best time to visit in JSON format`