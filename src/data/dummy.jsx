export default{
    firstName:'James',
    lastName:'Carter',
    jobTitle:'full stack developer',
    address:'525 N tryon Street, NC 28117',
    phone:'(123)-456-7890',
    email:'exmaple@gmail.com',
    themeColor:"#ff6666",
    summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experience:[
        {
            id:1,
            title:'Full Stack Developer',
            companyName:'Amazon',
            city:'New York',
            state:'NY',
            startDate:'2021-01-01',
            endDate:'',
            currentlyWorking:true,
            summary:' Designed, developed, and maintained full-stack applications using React and Node.js.\n'+
            '• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n'+
            'various devices and browsers.\n'+
            '• Maintaining the React Native in-house organization application.'+
            '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end'+
            'and back-end systems.'
        },
        {
            id:2,
            title:'Frontend Developer',
            companyName:'Google',
            city:'Charlotte',
            state:'NC',
            startDate:'2019-05-01',
            endDate:'2021-01-01',
            currentlyWorking:false,
            workSummery:' Designed, developed, and maintained full-stack applications using React and Node.js.'+
            '• Implemented responsive user interfaces with React, ensuring seamless user experiences across'+
            'various devices and browsers.'+
            '• Maintaining the React Native in-house organization application.'+
            '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end'+
            'and back-end systems.'
        }
    ],
    education:[
        {
            id:1,
            universityName:'Western Illinois University',
            startDate:'Aug 2018',
            endDate:'Dec:2019',
            degree:'Master',
            major:'Computer Science',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        },
        {
            id:2,
            universityName:'Western Illinois University',
            startDate:'Aug 2018',
            endDate:'Dec:2019',
            degree:'Master',
            major:'Computer Science',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        }
    ],
    skills:[
        {
            id:1,
            name:'Angular',
            rating:80,
        },
        {
            id:2,
            name:'React',
            rating:100,
        },
        {
            id:3,
            name:'MySql',
            rating:80,
        },
        {
            id:4,
            name:'React Native',
            rating:100,
        }
    ]
}