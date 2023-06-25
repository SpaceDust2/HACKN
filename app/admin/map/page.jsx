"use client";

import React from "react";
import { YMaps, Map, SearchControl, Polygon } from "react-yandex-maps";

const mapState = {
    center: [44.55, 33.52],
    zoom: 12,
};

const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff6600"];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectors: [],
            points: [],
            color: null,
            showMenu: false,
            selectedSector: null,
        };
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleAddSector = this.handleAddSector.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSectorClick = this.handleSectorClick.bind(this);
    }

    handleMapClick(e) {
        if (this.state.selectedSector !== null) {
            this.setState({ selectedSector: null });
            return;
        }

        const coords = e.get("coords");
        this.setState({
            points: [...this.state.points, coords],
            showMenu: this.state.points.length === 3,
        });
    }

    handleColorChange(e) {
        const color = e.target.value;
        this.setState({ color });
    }

    handleAddSector() {
        if (this.state.points.length === 4 && this.state.color !== null) {
            const sector = {
                sector: this.state.points,
                color: this.state.color,
                area: this.state.area,
                grapeVariety: this.state.grapeVariety,
                plantingDate: this.state.plantingDate,
            };
            this.setState({
                sectors: [...this.state.sectors, sector],
                points: [],
                color: null,
                showMenu: false,
            });
        }
    }

    handleCancel() {
        this.setState({
            points: [],
            color: null,
            showMenu: false,
        });
    }

    handleSectorClick(sector) {
        this.setState({ selectedSector: sector });
    }

    render() {
        const { selectedSector } = this.state;

        return (
            <YMaps query={{ apikey: "0ae5c692-f53f-4d6c-b669-a9098a1e8351" }}>
                <div style={{ display: "flex" }}>
                    <Map
                        state={mapState}
                        width="800px"
                        height="600px"
                        onClick={this.handleMapClick}
                    >
                        <SearchControl options={{ float: "right" }} />
                        {this.state.sectors.map((sector, index) => (
                            <Polygon
                                key={index}
                                geometry={[sector.sector]}
                                options={{
                                    fillColor: sector.color,
                                    strokeColor: "#000",
                                    opacity: 0.5,
                                    strokeWidth: 3,
                                }}
                                onClick={() => this.handleSectorClick(sector)}
                            />
                        ))}
                        {this.state.points.length > 0 && (
                            <Polygon
                                geometry={[this.state.points]}
                                options={{
                                    fillColor: "#fff",
                                    strokeColor: "#000",
                                    opacity: 0.5,
                                    strokeWidth: 3,
                                }}
                            />
                        )}
                    </Map>
                    {this.state.showMenu && (
                        <div style={{ margin: "20px" }}>
                            <h3>Выберите цвет</h3>
                            <select onChange={this.handleColorChange}>
                                <option value="">-</option>
                                <option value="#ff0000">Красный</option>
                                <option value="#00ff00">Зеленый</option>
                                <option value="#0000ff">Синий</option>
                                <option value="#ffff00">Желтый</option>
                                <option value="#ff6600">Оранжевый</option>
                            </select>
                            <h3>Информация о секторе</h3>
                            <label>Площадь (га):</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                onChange={(e) =>
                                    this.setState({ area: e.target.value })
                                }
                            />
                            <label>Сорт винограда:</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.setState({
                                        grapeVariety: e.target.value,
                                    })
                                }
                            />
                            <label>Дата посадки:</label>
                            <input
                                type="date"
                                onChange={(e) =>
                                    this.setState({
                                        plantingDate: e.target.value,
                                    })
                                }
                            />
                            <button onClick={this.handleAddSector}>
                                Добавить сектор
                            </button>
                            <button onClick={this.handleCancel}>Отмена</button>
                        </div>
                    )}
                    {selectedSector && (
                        <div style={{ margin: "20px" }}>
                            <h3>Информация о секторе</h3>
                            <p>Площадь: {selectedSector.area} га</p>
                            <p>Сорт винограда: {selectedSector.grapeVariety}</p>
                            <p>Дата посадки: {selectedSector.plantingDate}</p>
                        </div>
                    )}
                </div>
            </YMaps>
        );
    }
}

export default App;
