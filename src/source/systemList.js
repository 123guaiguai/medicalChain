const allTableData = [
    {
        patientName: "王婷婷",
        doctorName: "王建国",
        room: "内科",
        date: "2022-10-25",
        time: "16:30",
        tag: "completed"
    },
    {
        patientName: "陈佳琳",
        doctorName: "张晓明",
        room: "妇科",
        date: "2023-02-12",
        time: "10:45",
        tag: "pending"
    },
    {
        patientName: "李宇航",
        doctorName: "刘小红",
        room: "外科",
        date: "2022-11-03",
        time: "18:15",
        tag: "cancel"
    },
    {
        patientName: "王梦霞",
        doctorName: "李大志",
        room: "骨科",
        date: "2022-09-14",
        time: "09:20",
        tag: "completed"
    },
    {
        patientName: "陈欣怡",
        doctorName: "张建华",
        room: "内科",
        date: "2023-01-28",
        time: "14:35",
        tag: "completed"
    },
    {
        patientName: "赵文静",
        doctorName: "刘小明",
        room: "神经科",
        date: "2022-12-06",
        time: "10:00",
        tag: "pending"
    },
    {
        patientName: "王浩宇",
        doctorName: "张晓红",
        room: "耳鼻喉科",
        date: "2023-03-15",
        time: "14:20",
        tag: "completed"
    },
    {
        patientName: "刘丽华",
        doctorName: "王建国",
        room: "眼科",
        date: "2022-09-19",
        time: "11:30",
        tag: "pending"
    },
    {
        patientName: "李晓明",
        doctorName: "赵雪峰",
        room: "皮肤科",
        date: "2022-11-27",
        time: "15:40",
        tag: "completed"
    },
    {
        patientName: "王宇航",
        doctorName: "李小红",
        room: "消化内科",
        date: "2022-10-08",
        time: "09:50",
        tag: "cancel"
    },
    {
        patientName: "刘晨阳",
        doctorName: "张建华",
        room: "心脏科",
        date: "2023-04-02",
        time: "17:10",
        tag: "completed"
    },
    {
        patientName: "李佳琳",
        doctorName: "刘小明",
        room: "内分泌科",
        date: "2022-12-12",
        time: "13:15",
        tag: "completed"
    },
    {
        patientName: "王晨宇",
        doctorName: "王晓红",
        room: "妇科",
        date: "2023-02-28",
        time: "10:30",
        tag: "pending"
    },
    {
        patientName: "赵浩宇",
        doctorName: "张晓明",
        room: "儿科",
        date: "2022-09-23",
        time: "11:45",
        tag: "completed"
    },
    {
        patientName: "陈文静",
        doctorName: "刘小红",
        room: "普外科",
        date: "2022-11-30",
        time: "15:00",
        tag: "cancel"
    },
    {
        patientName: "王欣怡",
        doctorName: "李大志",
        room: "内科",
        date: "2022-10-12",
        time: "10:10",
        tag: "completed"
    },
    {
        patientName: "刘文婷",
        doctorName: "张建华",
        room: "骨科",
        date: "2023-03-08",
        time: "14:50",
        tag: "completed"
    },
    {
        patientName: "李浩宇",
        doctorName: "刘小明",
        room: "神经科",
        date: "2022-12-16",
        time: "11:20",
        tag: "pending"
    },
    {
        patientName: "王晨",
        doctorName: "王晓红",
        room: "耳鼻喉科",
        date: "2023-01-02",
        time: "16:25",
        tag: "completed"
    },
    {
        patientName: "陈佳琳",
        doctorName: "赵雪峰",
        room: "皮肤科",
        date: "2022-10-18",
        time: "09:40",
        tag: "completed"
    },
    {
        patientName: "刘宇航",
        doctorName: "李小红",
        room: "消化内科",
        date: "2023-02-03",
        time: "13:55",
        tag: "cancel"
    },
    {
        patientName: "李晨阳",
        doctorName: "张建华",
        room: "心脏科",
        date: "2022-09-27",
        time: "18:05",
        tag: "completed"
    },
    {
        patientName: "王佳琳",
        doctorName: "刘小明",
        room: "内分泌科",
        date: "2022-12-23",
        time: "12:30",
        tag: "completed"
    },
    {
        patientName: "陈晨宇",
        doctorName: "王晓红",
        room: "妇科",
        date: "2023-02-08",
        time: "11:00",
        tag: "pending"
    },
    {
        patientName: "赵晨宇",
        doctorName: "张晓明",
        room: "儿科",
        date: "2022-09-30",
        time: "13:25",
        tag: "completed"
    },
    {
        patientName: "刘佳琳",
        doctorName: "刘小红",
        room: "普外科",
        date: "2022-11-05",
        time: "15:40",
        tag: "cancel"
    },
    {
        patientName: "王文静",
        doctorName: "李大志",
        room: "内科",
        date: "2022-10-20",
        time: "09:55",
        tag: "completed"
    },
    {
        patientName: "陈欣怡",
        doctorName: "张建华",
        room: "骨科",
        date: "2023-03-12",
        time: "14:20",
        tag: "completed"
    },
    {
        patientName: "赵文静",
        doctorName: "刘小明",
        room: "神经科",
        date: "2022-12-26",
        time: "11:45",
        tag: "pending"
    },
    {
        patientName: "王晨",
        doctorName: "王晓红",
        room: "耳鼻喉科",
        date: "2023-01-08",
        time: "16:50",
        tag: "completed"
    },
    {
        patientName: "陈佳琳",
        doctorName: "赵雪峰",
        room: "皮肤科",
        date: "2022-10-22",
        time: "09:10",
        tag: "completed"
    },
    {
        patientName: "刘宇航",
        doctorName: "李小红",
        room: "消化内科",
        date: "2023-02-14",
        time: "13:35",
        tag: "cancel"
    },
    {
        patientName: "李晨阳",
        doctorName: "张建华",
        room: "心脏科",
        date: "2022-10-03",
        time: "18:30",
        tag: "completed"
    },
    {
        patientName: "王佳琳",
        doctorName: "刘小明",
        room: "内分泌科",
        date: "2022-12-29",
        time: "12:55",
        tag: "completed"
    }
]
export {
    allTableData
}
