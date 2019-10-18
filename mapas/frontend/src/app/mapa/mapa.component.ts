import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Lugar } from '../interfaces/lugar';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @ViewChild('map') mapaElement: ElementRef;
  map: google.maps.Map;

  marcadores: google.maps.Marker[] = [];

  lugares: Lugar[] = [
    {
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

  constructor() { }

  ngOnInit() {
    this.cargarMapa();
  }

  cargarMapa() {
    const latLng = new google.maps.LatLng(37.784679, -122.395936);
    const mapaOpciones: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapaElement.nativeElement, mapaOpciones);
    for (const lugar of this.lugares) {
      this.agregarMarcador(lugar);
    }
  }

  agregarMarcador(marcador: Lugar) {
    const latLng = new google.maps.LatLng(marcador.lat, marcador.lng);
    const market = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: latLng,
      draggable: true
    });
    this.marcadores.push(market);
    google.maps.event.addDomListener(market, 'dbclick', (coors) => {
      market.setMap(null);
      // Disparar un socket
    });
    google.maps.event.addDomListener(market, 'drag', (coors) => {
      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng()
      }
      // Disparar un socket
    });
  }

}
