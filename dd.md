function doPost(e) {
  var sheet = SpreadsheetApp.openById('1WnMECHDX_ehG2ibaaURD3PMQKXy2k4HRKDH3Z5wi6Ms').getSheets()[0];
  var data = {};
  if (e.postData && e.postData.contents) {
    try { data = JSON.parse(e.postData.contents); } catch(err){}
  }
  if (!data.name) data = e.parameter || {};
  // 헤더 없으면 생성
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['타임스탬프','성함','연락처','참석여부','인원수','동반자','메시지']);
  }
  var attending = data.attending;
  if (typeof attending === 'string') {
    attending = (attending === 'true' || attending === '참석');
  }
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    attending ? '참석' : '불참',
    parseInt(data.guestCount, 10) || 1,
    data.companions || '',
    data.message || ''
  ]);
  // 주의: ContentService에는 setHeader가 없음. CORS 회피는 프론트에서 no-cors로 처리.
  return ContentService.createTextOutput(JSON.stringify({result:'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
function doGet(e){ return doPost(e); }