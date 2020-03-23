import {getUploadFileParams} from '@/utils/utils';
import { fileService } from '@/api/index';

export default function () {
    if(arguments.length > 0) {
        for(var i in arguments) {
            arguments[i].customConfig.zIndex = 2;
            // arguments[i].customConfig.uploadImgShowBase64 = true;
            arguments[i].customConfig.customUploadImg = function (files, insert) {
                var file = files[0];
              let r = new FileReader();
              r.readAsDataURL(file);
              r.onload = (e) => {
                insert(e.target.result)
              };
            };
            arguments[i].customConfig.menus  = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                // 'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ];
        }
    }
}
