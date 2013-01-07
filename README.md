HTML5 pingus, Linux HTML5 port attempt
===========

(WIP)...Broken draft version
===========

Working demo: http://etribz.fr/workshop/pingus/pingus.html
===========

gameloop
===========
* controls update
* state machine (cf. todo)
* draw level platforms, tiles & holes
* pingus lifecycle
* pingus list update according to list elements status
* input updates

pingus lifecycle
===========
* current jobs & capacities (miner, bridger, floater, etc...) update
* do the job (make tiles for miner, bridger and digger)
* coords update & animation
* status update (falling, splashing, diving?)

NB: digging, bridging & mining creates elements (emptyness or tiles) in lists. Those are displayed as static elements
NB2: pixels colors are used to detect collision


TODO
===========
* THE layout thing
* pixel ratio (CSS3?)
* level loader
* state machine (pause, start)
* touch control

BUGS
===========
* manyz...
