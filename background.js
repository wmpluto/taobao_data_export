chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'exportData') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: extractData
        }, (results) => {
          const data = results[0].result;
          data.forEach((item, index) => {
            const folderName = `商品_${index + 1}`;
            
            // 下载图片
            // chrome.downloads.download({
            //   url: item.image,
            //   filename: `${folderName}/image.webp`
            // });

            console.log(`${folderName} xxxx ${item.image} xxxx ${item.name} xxxx ${item.price.slice(3) + item.price.slice(0,3)} xxxx ${item.sales} xxxx` )
            // // 创建包含名称、价格和销量的文本文件
            // const textBlob = new Blob([`名称: ${item.name}\n价格: ${item.price}\n销量: ${item.sales}`], { type: 'text/plain' });
            // const textUrl = URL.createObjectURL(textBlob);
            // chrome.downloads.download({
            //   url: textUrl,
            //   filename: `${folderName}/details.txt`
            // });
          });
        });
      });
    }
  });
  
  function extractData() {
    const rows = document.getElementsByClassName('Card--listCardWrapper--ax09OfT'); // 修改为实际表单行的选择器
    console.log(rows)
    const data = [];
    for (let i = 0; i < rows.length; i++) {
         // get image
        var imgDivElement = rows[i].getElementsByClassName('Card--listCardLeftWrap--McN_0tU');
         // 获取图片元素
        var imgElement = imgDivElement[0].querySelector('img');
        // 提取图片的 src 属性
        var src = imgElement.src;
      const image = src; // 修改为实际图片的选择器
      var nameDivElement = rows[i].getElementsByClassName('Title--title--jCOPvpf');
      const name = nameDivElement[0].textContent; // 修改为实际名称的选择器
      var priceDivElement = rows[i].getElementsByClassName("Price--priceWrapper--Q0Dn7pN Price--listMod--ShHaMAE");
      const price = priceDivElement[0].textContent; // 修改为实际价格的选择器
      var salesDivElement = rows[i].getElementsByClassName("RealSales--realSales--c1DD62u");
      const sales = salesDivElement[0].textContent;; // 修改为实际销量的选择器
      console.log(sales)
      data.push({ image, name, price, sales });
    };
    return data;
  }
  