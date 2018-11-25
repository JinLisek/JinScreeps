var RoleFunctions = require('RoleFunctions');

const ArchitectRestPos = new RoomPosition(40, 15, "W32S11")

var roleArchitect = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy > creep.carryCapacity / 3) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {
                var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.pos.getRangeTo(closestSource) < 3)
                    RoleFunctions.moveCreepToTarget(creep, ArchitectRestPos);
                else if(creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                    RoleFunctions.moveCreepToTarget(creep, targets[0]);
            }
            else
            {
                RoleFunctions.moveCreepToTarget(creep, ArchitectRestPos);
            }
	    }
	    else {
	        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                RoleFunctions.moveCreepToTarget(creep, closestSource);
            }
	    }
	}
};

module.exports = roleArchitect;