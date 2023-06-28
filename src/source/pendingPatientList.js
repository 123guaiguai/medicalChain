const allTableData = [
    {
        patientId: "157auoWs2H12",
        patientName: "张三",
        patientAge: "67",
        room: "内科",
        time: "2016-05-02",
        tag: "pending"
    },
    {
        patientId: "hI7jK2lM4N21",
        patientName: "李四",
        patientAge: "42",
        room: "外科",
        time: "2016-05-03",
        tag: "completed"
    },
    {
        patientId: "oP9qR3sT6Uee",
        patientName: "王五",
        patientAge: "28",
        room: "妇科",
        time: "2016-05-04",
        tag: "cancel"
    },
    {
        patientId: "vW2xY8zA7Bw2",
        patientName: "赵六",
        patientAge: "50",
        room: "心脏科",
        time: "2016-05-05",
        tag: "pending"
    },
    {
        patientId: "cD5eF9gH3I1s",
        patientName: "钱七",
        patientAge: "37",
        room: "神经科",
        time: "2016-05-06",
        tag: "completed"
    },
    {
        patientId: "jK2lM4nO8P4f",
        patientName: "孙八",
        patientAge: "45",
        room: "眼科",
        time: "2016-05-07",
        tag: "cancel"
    },
    {
        patientId: "qR3sT6uW9X6h",
        patientName: "周九",
        patientAge: "33",
        room: "肿瘤科",
        time: "2016-05-08",
        tag: "pending"
    },
    {
        patientId: "yZ8aB7cD5E3e",
        patientName: "吴十",
        patientAge: "39",
        room: "耳鼻喉科",
        time: "2016-05-09",
        tag: "pending"
    },
    {
        patientId: "eF9gH3iJ7K8f",
        patientName: "郑十一",
        patientAge: "52",
        room: "口腔科",
        time: "2016-05-10",
        tag: "completed"
    },
    {
        patientId: "mO8pQ5rS2T1A",
        patientName: "王十二",
        patientAge: "31",
        room: "消化科",
        time: "2016-05-11",
        tag: "cancel"
    },
    {
        patientId: "uW9xY4zA6B",
        patientName: "李十三",
        patientAge: "47",
        room: "骨科",
        time: "2016-05-12",
        tag: "completed"
    },
    {
        patientId: "gH3iJ7kL9M",
        patientName: "张十四",
        patientAge: "36",
        room: "皮肤科",
        time: "2016-05-13",
        tag: "pending"
    },
    {
        patientId: "rS2tU5vW8X",
        patientName: "刘十五",
        patientAge: "43",
        room: "肾内科",
        time: "2016-05-14",
        tag: "pending"
    },
    {
        patientId: "yZ8aB7cD5E",
        patientName: "陈十六",
        patientAge: "29",
        room: "呼吸科",
        time: "2016-05-15",
        tag: "completed"
    },
    {
        patientId: "jK2lM4nO8P",
        patientName: "杨十七",
        patientAge: "49",
        room: "血液科",
        time: "2016-05-16",
        tag: "cancel"
    },
    {
        patientId: "eF9gH3iJ7K",
        patientName: "黄十八",
        patientAge: "38",
        room: "泌尿科",
        time: "2016-05-17",
        tag: "pending"
    },
    {
        patientId: "mO8pQ5rS2T",
        patientName: "罗十九",
        patientAge: "54",
        room: "内分泌科",
        time: "2016-05-18",
        tag: "pending"
    },
    {
        patientId: "uW9xY4zA6B",
        patientName: "林二十",
        patientAge: "32",
        room: "康复科",
        time: "2016-05-19",
        tag: "cancel"
    },
    {
        patientId: "gH3iJ7kL9M",
        patientName: "梁二十一",
        patientAge: "41",
        room: "整形科",
        time: "2016-05-20",
        tag: "pending"
    },
    {
        patientId: "rS2tU5vW8X",
        patientName: "赖二十二",
        patientAge: "30",
        room: "中医科",
        time: "2016-05-21",
        tag: "pending"
    },
    {
        patientId: "yZ8aB7cD5E",
        patientName: "郭二十三",
        patientAge: "48",
        room: "康复科",
        time: "2016-05-22",
        tag: "completed"
    },
    {
        patientId: "jK2lM4nO8P",
        patientName: "胡二十四",
        patientAge: "37",
        room: "神经科",
        time: "2016-05-23",
        tag: "completed"
    },
    {
        patientId: "eF9gH3iJ7K",
        patientName: "陈二十五",
        patientAge: "51",
        room: "眼科",
        time: "2016-05-24",
        tag: "pending"
    },
    {
        patientId: "mO8pQ5rS2T",
        patientName: "钟二十六",
        patientAge: "34",
        room: "妇科",
        time: "2016-05-25",
        tag: "pending"
    },
    {
        patientId: "uW9xY4zA6B",
        patientName: "温二十七",
        patientAge: "46",
        room: "心脏科",
        time: "2016-05-26",
        tag: "completed"
    },
    {
        patientId: "gH3iJ7kL9M",
        patientName: "曾二十八",
        patientAge: "40",
        room: "外科",
        time: "2016-05-27",
        tag: "pending"
    },
    {
        patientId: "rS2tU5vW8X",
        patientName: "冯二十九",
        patientAge: "31",
        room: "肿瘤科",
        time: "2016-05-28",
        tag: "pending"
    },
    {
        patientId: "yZ8aB7cD5E",
        patientName: "陆三十",
        patientAge: "44",
        room: "口腔科",
        time: "2016-05-29",
        tag: "completed"
    }
]
export {
    allTableData
}