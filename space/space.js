/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
	this.name = name;
	this.position = [position[0], position[1]];
	this.capacity = capacity;
	this.currentCargoWeight = 0;
	}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
	console.log(this.name + ". Местоположение: " + this.position + " " + this.getOccupiedSpace()); //!!!!!
	}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
	return this.capacity - this.currentCargoWeight;
	}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
	if (this.currentCargoWeight == 0) {
		return "Товаров нет";
	} else {
		return "Груз: " + this.currentCargoWeight;
	}
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
	if (newPosition instanceof Planet) {
		this.position = newPosition.position;
	} else {
		this.position = [newPosition[0], newPosition[1]];
	}
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name = name;
	this.position = [position[0], position[1]];
	this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
	console.log(this.name + ". Местоположение: " + this.position + " Доступно груза: " + this.getAvailableAmountOfCargo() +"т"); //!!!!!
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
	return this.availableAmountOfCargo;
}
	
/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
	if (vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1]) {
		if (vessel.getFreeSpace() >= cargoWeight) {
			vessel.currentCargoWeight = vessel.currentCargoWeight + cargoWeight;
			this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
		} else {
			console.log("Нет места");
		}
	} else {
		console.log('Корабль еще в космосе');
	}
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if (vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1]) {
		this.availableAmountOfCargo = this.availableAmountOfCargo + cargoWeight;
		vessel.currentCargoWeight = vessel.currentCargoWeight - cargoWeight;
	}  else {
		console.log("Корабль еще в космосе");
	}
}

var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

vessel.report(); 
planetA.report();
planetB.report(); 

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report();

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); 
planetA.report(); 
planetB.report();
