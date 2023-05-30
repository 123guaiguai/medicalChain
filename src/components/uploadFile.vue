<template>
  <div class="tabsWrapper">
    <el-tabs type="card" class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Download /></el-icon>
            <span>CSV</span>
          </span>
        </template>
        <el-text class="mx-1" type="primary" size="large">下载CSV</el-text>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><FolderAdd /></el-icon>
            <span>print</span>
          </span>
        </template>

        <el-text class="mx-1" type="primary" size="large">下载print</el-text>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><DocumentCopy /></el-icon>
            <span>PDF</span>
          </span>
        </template>
        <el-text class="mx-1" type="primary" size="large">下载PDF</el-text>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label" @click="exportToExcel">
            <el-icon><Notebook /></el-icon>
            <span>Excel</span>
          </span>
        </template>
        <el-text class="mx-1" type="primary" size="large">下载Excel</el-text>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import saveAs from "file-saver";
import Excel from "exceljs";
const props = defineProps({
  fileName: {
    type: String,
    default: "测试数据",
    required: true,
  },
  data: Array,
  fields: Object,
  headers:Array,
});

// 导出Excel表格的函数
const exportFile = (header, columns, dataList, expertName) => {
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  let workbook = new Excel.Workbook();
  workbook.created = new Date();
  workbook.modified = new Date();
  let worksheet = workbook.addWorksheet("sheet1");
  worksheet.properties.defaultColWidth = 14;
  worksheet.columns = columns;
  // 设置表头
  worksheet.getRow(1).values = [expertName];
  worksheet.mergeCells(1, 1, 1, columns.length); //第1行  第1列  合并到第1行的第n列
  const title = worksheet.getRow(1).getCell(1); //第一行第一个单元格
  title.font = { size: 24 };
  worksheet.getRow(1).height = 40;

  worksheet.getRow(2).values = header;
  // debugger
  // 表头样式
  worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell, colNumber) => {
    worksheet.getRow(2).getCell(colNumber).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF0000" },
      bgColor: { argb: "FF0000FF" },
    };
    worksheet.getRow(2).getCell(colNumber).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  worksheet.addRows(dataList);
  // 自定义样式
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) {
      worksheet.getRow(rowNumber).height = 28.6;
    }
    worksheet
      .getRow(rowNumber)
      .eachCell({ includeEmpty: true }, (cell, colNumber) => {
        // 文字居中
        worksheet.getRow(rowNumber).getCell(colNumber).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        //边框样式
        worksheet.getRow(rowNumber).getCell(colNumber).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
  });
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(blob, `${expertName}.xlsx`);
  });
};

const exportToExcel = () => {
  const columns = props.headers.map((item) => {
    return {
      header: item,
      key: item,
    };
  });
  const dataList = props.data.map((item) => {
    let res = {};
    for(let i in item as any){
      if(props.fields.hasOwnProperty(i)){
        res[props.fields[i]]=item[i]
      }
    }
    return res
  });
  exportFile(props.headers, columns, dataList, props.fileName);
};
</script>

<style scoped lang="less">
.tabsWrapper {
  width: 50%;
  margin: 20px auto;
  .custom-tabs-label {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>