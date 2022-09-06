// 1. 编写图形绘画函数
// 其中，calculative.worldRect为canvas的世界坐标。更多信息，参考 “架构” - “概要” 和 Pen 相关文档
// 形参 ctx 仅仅在 downloadSvg 时有值
export const baseBusBar = (pen, ctx) => {
    const path = !ctx ? new Path2D() : ctx;
    const { x, y, width, height } = pen.calculative.worldRect;
    path.moveTo(x, y);
    path.lineTo(x + width, y); // 上
    path.lineTo(x + width, y + height); // 右
    path.lineTo(x, y + height); // 下
    path.lineTo(x, y); //左
    path.closePath();
    if (path instanceof Path2D) return path;
};
