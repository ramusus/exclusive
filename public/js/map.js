function showMap () {
	YMaps.load(function() {
		var mapContainer = YMaps.jQuery("#YMapsID"),
			map = new YMaps.Map(mapContainer[0]);

		mapContainer.css("display", "");
		map.setCenter(new YMaps.GeoPoint(35.900883,56.872555), 17);
		
		map.addControl(new YMaps.Zoom(), new YMaps.ControlPosition(YMaps.ControlPosition.TOP_LEFT, new YMaps.Size(10, 70)));
		
		map.addControl(new YMaps.ToolBar(), new YMaps.ControlPosition(YMaps.ControlPosition.TOP_LEFT, new YMaps.Size(10, 10)));
		
		var placemark = new YMaps.Placemark(new YMaps.GeoPoint(35.900883,56.872555), {style: "default#darkbluePoint"});
		placemark.setIconContent("Компания \"Эксклюзив\"");
		placemark.name = "Компания \"Эксклюзив\"";
		placemark.description = "г. Тверь, ул. Карпинского, 18";
		map.addOverlay(placemark);
	});
}
