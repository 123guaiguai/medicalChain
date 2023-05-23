const patientTagMap={//构造患者状态到tag类型的映射
    'cancel':"danger",
    "pending":"warning",
    "completed":"success"
}
const doctorTagMap={//构造医生状态到tag类型的映射
    '不可出诊':"danger",
    "休假":"warning",
    "可出诊":"success"
}
const recordTagMap={//构造病历状态到tag类型的映射
    '未上传':"warning",
    "已上传":"success"
}
const insuranceTagMap={//构造保单状态到tag类型的映射
    '已生效':"success",
    '未生效':"danger"
}
const reimbursementTagMap={
    '待批准':"warning",
    '已拒绝':"danger",
    '已批准':"success"
}
export {
    patientTagMap,
    doctorTagMap,
    recordTagMap,
    insuranceTagMap,
    reimbursementTagMap,
}