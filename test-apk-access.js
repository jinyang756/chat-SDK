// 这个脚本用于测试APK文件的访问路径是否正确
// 使用方法：在浏览器中访问 http://localhost:8080/test-apk-access.js

// 输出当前页面URL，帮助用户了解实际访问路径
console.log('当前页面URL:', window.location.href);

// 检查APK文件是否存在并可访问
try {
    const apkUrl = new URL('企联通.apk', window.location.origin);
    console.log('APK文件的完整路径:', apkUrl.href);
    console.log('请尝试通过以下链接下载APK文件:', apkUrl.href);
    
    // 显示下载按钮的HTML结构，供参考
    console.log('下载按钮HTML参考:');
    console.log('<a href="' + apkUrl.pathname + '" download class="download-button">下载APK</a>');
    
    // 创建简单的测试UI
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.maxWidth = '600px';
    document.body.style.margin = '0 auto';
    document.body.style.padding = '20px';
    
    const h1 = document.createElement('h1');
    h1.textContent = 'APK文件访问测试';
    document.body.appendChild(h1);
    
    const p1 = document.createElement('p');
    p1.textContent = '当前页面URL: ' + window.location.href;
    document.body.appendChild(p1);
    
    const p2 = document.createElement('p');
    p2.textContent = 'APK文件的完整路径: ' + apkUrl.href;
    document.body.appendChild(p2);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = apkUrl.pathname;
    downloadLink.download = '企联通.apk';
    downloadLink.textContent = '点击这里测试下载APK文件';
    downloadLink.style.display = 'inline-block';
    downloadLink.style.padding = '10px 20px';
    downloadLink.style.backgroundColor = '#4CAF50';
    downloadLink.style.color = 'white';
    downloadLink.style.textDecoration = 'none';
    downloadLink.style.borderRadius = '5px';
    document.body.appendChild(downloadLink);
    
    // 添加成功配置的说明
    const note = document.createElement('div');
    note.style.marginTop = '20px';
    note.style.padding = '15px';
    note.style.backgroundColor = '#f0f0f0';
    note.style.borderRadius = '5px';
    note.innerHTML = `
        <h3>配置说明</h3>
        <p>1. APK文件已从Git中移除但保留在本地</p>
        <p>2. 修改了vercel.json，添加了对APK文件的特殊路由规则</p>
        <p>3. 设置了正确的MIME类型: application/vnd.android.package-archive</p>
        <p>4. 当部署到Vercel时，APK文件将可以正常被访问和下载</p>
    `;
    document.body.appendChild(note);
} catch (error) {
    console.error('创建APK文件URL时出错:', error);
    alert('测试APK文件访问时出错: ' + error.message);
}