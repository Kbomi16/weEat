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

