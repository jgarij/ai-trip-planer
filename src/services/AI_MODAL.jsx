import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_MODAL_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role:"user",
            parts: [
                {text: "Generate travel trip for location Indore, Madhya Pradesh, India for 2 days for couples with a Moderate budget.Give me hotel option lists along  with HotelName,address,price,hotel image url ,geo cordinates,rating, descriptions,And  also suggest itinerary for 2 days  with placeName,Place Details,Place image url,geo coordinates,ticket pricing, best time to travel each of the location for 2 days with each day plain with best time to visit in JSON format\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "```json\n{\n  \"tripName\": \"Romantic Indore Getaway (2 Days)\",\n  \"budget\": \"Moderate\",\n  \"bestTimeToVisit\": \"October to March\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Sayaji Indore\",\n      \"address\": \"H/1, Scheme No. 54, Vijay Nagar, Indore, Madhya Pradesh 452010\",\n      \"price\": \"₹4000 - ₹6000\", \n      \"imageUrl\": \"https://www.sayajihotels.com/wp-content/uploads/2019/01/indore-exterior-1024x680.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": 22.7233,\n        \"longitude\": 75.8767\n      },\n      \"rating\": 4.5,\n      \"description\": \"Luxurious hotel with great amenities and dining options.\"\n    },\n    {\n      \"hotelName\": \"Radisson Blu Hotel Indore\",\n      \"address\": \"Bypass Road, opposite C21 Mall, MR 10 Square, Indore, Madhya Pradesh 452010\",\n      \"price\": \"₹3500 - ₹5500\",\n      \"imageUrl\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/1b/dd/93/exterior.jpg?w=900&h=-1&s=1\",\n      \"geoCoordinates\": {\n        \"latitude\": 22.6968,\n        \"longitude\": 75.8546\n      },\n      \"rating\": 4.3,\n      \"description\": \"Modern hotel with stylish rooms and a rooftop pool.\"\n    },\n    {\n      \"hotelName\": \"Hotel Apna Palace\",\n      \"address\": \"10/3, South Tukoganj, Near Railway Station, Chhoti Gwaltoli, Indore, Madhya Pradesh 452001\",\n      \"price\": \"₹2000 - ₹3500\",\n      \"imageUrl\": \"https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201607201830222257-7d635752b68d11ed84f60242ac110002.jpg?&output-quality=75&downsize=520:350&crop=520:350;0,25&output-format=jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 22.7155,\n        \"longitude\": 75.8680\n      },\n      \"rating\": 4.0,\n      \"description\": \"Comfortable hotel with a central location and good value.\"\n    }\n\n ],\n\n  \"itinerary\": {\n    \"day1\": {\n      \"bestTimeToVisit\": \"Morning\",\n      \"places\": [\n        {\n          \"placeName\": \"Rajwada Palace\",\n          \"placeDetails\": \"Historic palace with beautiful architecture.\",\n          \"imageUrl\": \"https://www.mptourism.com/images/places-to-visit/headers/rajwada-palace-indore-madhya-pradesh-tourism-382.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 22.7120,\n            \"longitude\": 75.8531\n          },\n          \"ticketPrice\": \"₹50\",\n          \"timings\":\"9.30am to 5.00pm\"\n        },\n        {\n          \"placeName\": \"Khajarana Ganesh Temple\",\n          \"placeDetails\": \"Famous temple dedicated to Lord Ganesha.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Khajrana_Ganesh_Temple%2C_Indore%2C_Madhya_Pradesh_2.JPG/800px-Khajrana_Ganesh_Temple%2C_Indore%2C_Madhya_Pradesh_2.JPG\",\n          \"geoCoordinates\": {\n            \"latitude\": 22.7300,\n            \"longitude\": 75.9060\n          },\n          \"ticketPrice\": \"Free\",\n          \"timings\":\"5.00am to 11.00pm\" \n        }\n      ]\n    },\n    \"day2\": {\n      \"bestTimeToVisit\": \"Morning or Afternoon\",\n      \"places\": [\n        {\n          \"placeName\": \"Patalpani Waterfall\",\n          \"placeDetails\": \"Scenic waterfall surrounded by lush greenery.\",\n          \"imageUrl\": \"https://www.holidify.com/images/cmsuploads/compressed/Patalpani_Waterfall_20180614151249.JPG\",\n          \"geoCoordinates\": {\n            \"latitude\": 22.5202,\n            \"longitude\": 75.9351\n          },\n          \"ticketPrice\": \"₹20\",\n          \"timings\":\"Sunrise to Sunset\"\n        },\n        {\n          \"placeName\": \"Sarafa Bazaar (Evening)\",\n          \"placeDetails\": \"Vibrant night food market with a wide variety of street food.\",\n          \"imageUrl\": \"https://www.indorehd.com/wp-content/uploads/2019/07/sarafa-market-indore.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 22.7119,\n            \"longitude\": 75.8542\n          },\n          \"ticketPrice\": \"Free (food costs extra)\",\n          \"timings\":\"8pm to late night\"\n        }\n      ]\n    }\n  }\n}\n```\n\n\n**Hotel Image URLs Note:**  I've included repres"},
              ],
        },
    ],
});




