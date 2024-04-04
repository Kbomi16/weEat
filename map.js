// !위워크 위치를 중심좌표로 설정 후 마커와 인포윈도우 생성!
const mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.5651562, 126.9869995), // 위워크를 중심좌표로
    level: 3, // 지도의 확대 레벨
  };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
  position: mapOption.center,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

const iwContent = '<div style="padding:0 2.8rem;">weWork</div>',
  iwPosition = mapOption.center;

// 인포윈도우를 생성합니다
const infowindowWework = new kakao.maps.InfoWindow({
  position: iwPosition,
  content: iwContent,
});

// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindowWework.open(map, marker);

// !json파일의 title을 받아와 여러 개 마커 띄우기!
// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places();

fetch("EuljiroJMT.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((place) => {
      const searchTitle = place.title;

      // 제목으로 장소를 검색
      ps.keywordSearch(searchTitle, placesSearchCB);
      console.log(searchTitle);
    });
  })
  .catch((error) => {
    console.error("데이터를 가져오는 도중 오류가 발생했습니다:", error);
  });

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();

    for (const i = 0; i < data.length; i++) {
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 마우스 호버 이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "mouseover", function () {
    // 인포윈도우를 열고 내용을 설정합니다
    infowindow.setContent(
      '<div style="padding:0.1rem 2.8rem; font-size: 12px; text-align:center;">' +
        place.place_name +
        "</div>"
    );
    infowindow.open(map, marker);
  });

  // 마커에 마우스 아웃 이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "mouseout", function () {
    // 인포윈도우를 닫습니다
    infowindow.close();
  });
}
