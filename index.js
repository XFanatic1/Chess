let xAxis
let yAxis
let possibleMoves = []
let x = 0
let y = 1
let inCheck = 0
checkOffenders = []
checkOffendersPiece = []
let theBreak

let pieces = {
    whiteRook1: {side: 'w',cords: [8, 1],class: 'rook',img: './resources/whiteRook.png',name: 'whiteRook1',},
    whiteRook2: {side: 'w',cords: [1, 1],class: 'rook',img: './resources/whiteRook.png',name: 'whiteRook2',},
    whiteBishop1: {side: 'w',cords: [3, 1],class: 'bishop',img: './resources/whiteBishop.png',name: 'whiteBishop1',},
    whiteBishop2: {side: 'w',cords: [6, 1],class: 'bishop',img: './resources/whiteBishop.png',name: 'whiteBishop2',},
    blackBishop1: {side: 'b',cords: [6, 8],class: 'bishop',img: './resources/blackBishop.png',name: 'blackBishop1',},
    blackBishop2: {side: 'b',cords: [3, 8],class: 'bishop',img: './resources/blackBishop.png',name: 'blackBishop2',},
    blackRook1: {side: 'b',cords: [1, 8],class: 'rook',img: './resources/blackRook.png',name: 'blackRook1',},
    blackRook2: {side: 'b',cords: [8, 8],class: 'rook',img: './resources/blackRook.png',name: 'blackRook2',},
    whiteQueen: {side: 'w',cords: [4, 1],class: 'queen',img: './resources/whiteQueen.png',name: 'whiteQueen',},
    blackQueen: {side: 'b',cords: [4, 8],class: 'queen',img: './resources/blackQueen.png',name: 'blackQueen',},
    whiteKnight1: {side: 'w',cords: [2, 1],class: 'knight',img: './resources/whiteKnight.png',name: 'whiteKnight1',},
    whiteKnight2: {side: 'w',cords: [7, 1],class: 'knight',img: './resources/whiteKnight.png',name: 'whiteKnight2',},
    blackKnight1: {side: 'b',cords: [2, 8],class: 'knight',img: './resources/blackKnight.png',name: 'blackKnight1',},
    blackKnight2: {side: 'b',cords: [7, 8],class: 'knight',img: './resources/blackKnight.png',name: 'blackKnight2',},
    whiteKing: {side: 'w',cords: [5, 1],class: 'king',img: './resources/whiteKing.png',name: 'whiteKing',},
    blackKing: {side: 'b',cords: [5, 8],class: 'king',img: './resources/blackKing.png',name: 'blackKing',},
    whitePawn1: { side: 'w', cords: [1, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn1',},
    whitePawn2: { side: 'w', cords: [2, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn2',},
    whitePawn3: { side: 'w', cords: [3, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn3',},
    whitePawn4: { side: 'w', cords: [4, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn4',},
    whitePawn5: { side: 'w', cords: [5, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn5',},
    whitePawn6: { side: 'w', cords: [6, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn6',},
    whitePawn7: { side: 'w', cords: [7, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn7',},
    whitePawn8: { side: 'w', cords: [8, 2], class: 'pawn', img: './resources/whitePawn.png', name: 'whitePawn8',},
    blackPawn1: { side: 'b', cords: [1, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn1',},
    blackPawn2: { side: 'b', cords: [2, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn2',},
    blackPawn3: { side: 'b', cords: [3, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn3',},
    blackPawn4: { side: 'b', cords: [4, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn4',},
    blackPawn5: { side: 'b', cords: [5, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn5',},
    blackPawn6: { side: 'b', cords: [6, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn6',},
    blackPawn7: { side: 'b', cords: [7, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn7',},
    blackPawn8: { side: 'b', cords: [8, 7], class: 'pawn', img: './resources/blackPawn.png', name: 'blackPawn8',},
}

function checkIfHit(xCord, yCord, thePieceShort) { //use this when king moves to see if all pieces would hit
    console.log(xCord,yCord)
    for (let key in pieces) {
        if ((pieces[key].cords[x] === xCord) && (pieces[key].cords[y] === yCord)) {
            if (thePieceShort.side !== pieces[key].side) {
                console.log('enemny piece hit')
                return 2
            } else {
                console.log('team piece hit')
                return 1
            }
        }
    }
    console.log('hit nothing')
    return 0
}

function rookBishopEnigne(thePieceShort, xAxis = 0, yAxis = 0) { // this is a engine ultilized for rook and bishop

    if (thePieceShort.class === 'pawn') {
        let theY = 1
        if (thePieceShort.side === 'b') {
            theY = -1
            if (thePieceShort.cords[1] === 7) {
                if (checkIfHit((thePieceShort.cords[x]), thePieceShort.cords[y] - 2, thePieceShort) === 0) {
                    possibleMoves.push((thePieceShort.cords[x] + 0) + '' + (thePieceShort.cords[y] -2))
                }
            }
        } else if (thePieceShort.cords[1] === 2) {
            if (checkIfHit((thePieceShort.cords[x]), thePieceShort.cords[y] + 2, thePieceShort) === 0) {
                possibleMoves.push((thePieceShort.cords[x] + 0) + '' + (thePieceShort.cords[y] + 2))
            }
        }

        if (checkIfHit((thePieceShort.cords[x] + 0), thePieceShort.cords[y] + theY, thePieceShort) === 0) {
            possibleMoves.push((thePieceShort.cords[x] + 0) + '' + (thePieceShort.cords[y] + theY))
        }
        possibleMoves.push('break')
        if (checkIfHit((thePieceShort.cords[x] + 1), thePieceShort.cords[y] + theY, thePieceShort) === 2) {
            possibleMoves.push((thePieceShort.cords[x] + 1) + '' + (thePieceShort.cords[y] + theY))
        }
        possibleMoves.push('break')
        if (checkIfHit((thePieceShort.cords[x] - 1), thePieceShort.cords[y] + theY, thePieceShort) === 2) {
            possibleMoves.push((thePieceShort.cords[x] - 1) + '' + (thePieceShort.cords[y] + theY))
        }
        possibleMoves.push('break')
        return 0
    }
    for (let ix = 0 + xAxis, iy = 0 + yAxis; ix < 100; ix = ix + xAxis, iy = iy + yAxis) {
        //make sure it has a 2 hump start
        if (((thePieceShort.cords[x] + ix) > 8) || ((thePieceShort.cords[x] + ix) < 1) || ((thePieceShort.cords[y] + iy) > 8) || ((thePieceShort.cords[y] + iy) < 1)) {
            possibleMoves.push('break')
            break
        }
        let checkHit = checkIfHit((thePieceShort.cords[x] + ix), thePieceShort.cords[y] + iy, thePieceShort)
        if (checkHit === 1) {
            possibleMoves.push('break')
            break
        } else if (checkHit === 2) {
            possibleMoves.push((thePieceShort.cords[x] + ix) + '' + (thePieceShort.cords[y] + iy))
            possibleMoves.push('break')
            break
        } else {
            possibleMoves.push((thePieceShort.cords[x] + ix) + '' + (thePieceShort.cords[y] + iy))
        }

        if ((thePieceShort.class === 'king') || (thePieceShort.class === 'knight')) {
            possibleMoves.push('break')
            break
        }
    }
}

function killPiece(thePieceShort, tileID) {
    for (let key in pieces) {
        if ((pieces[key].side !== thePieceShort.side)) {
            if ((pieces[key].cords[0] === thePieceShort.cords[0]) && (pieces[key].cords[1] === thePieceShort.cords[1])) {
                pieces[key].cords = ''
                document.getElementById(tileID).firstChild.remove()
            }
        }
    }
}

function checkForCheck(thePieceShort) { //only offensive check is done still need to do prevent check and stop offensive check
    let theKing
    for (let key in pieces) {
        if ((pieces[key].side !== thePieceShort.side) && (pieces[key].class === 'king')) {
            theKing = pieces[key]
            break
        }
    }
    for (let key in pieces) {
        if ((pieces[key].cords !== '') && (pieces[key].side === thePieceShort.side)) { //check if its alive
            console.log(pieces[key])
            CalculatePossibleMoves(pieces[key].name, 1, 1, 1, 1)
            for (let i = 0; i < possibleMoves.length; i++) {

                if ((parseInt(possibleMoves[i][0]) === theKing.cords[0]) && (parseInt(possibleMoves[i][1]) === theKing.cords[1])) {
                    checkOffenders = possibleMoves //make this push later!!!
                    checkOffendersPiece = pieces[key]
                    possibleMoves = []
                    inCheck++
                }
            }
            possibleMoves = []
        }
    }
}

function queenKing(thePieceShort) {
    rookBishopEnigne(thePieceShort, -1)
    rookBishopEnigne(thePieceShort, 1)
    rookBishopEnigne(thePieceShort, 0, 1)
    rookBishopEnigne(thePieceShort, 0, -1)
    rookBishopEnigne(thePieceShort, -1, -1)
    rookBishopEnigne(thePieceShort, 1, 1)
    rookBishopEnigne(thePieceShort, -1, 1)
    rookBishopEnigne(thePieceShort, 1, -1)
}
function rook(thePieceShort) {
    rookBishopEnigne(thePieceShort, -1)
    rookBishopEnigne(thePieceShort, 1)
    rookBishopEnigne(thePieceShort, 0, 1)
    rookBishopEnigne(thePieceShort, 0, -1)
}
function bishop(thePieceShort) {
    rookBishopEnigne(thePieceShort, -1, -1)
    rookBishopEnigne(thePieceShort, 1, 1)
    rookBishopEnigne(thePieceShort, -1, 1)
    rookBishopEnigne(thePieceShort, 1, -1)
}
function pawn (thePieceShort) { //if rook ever becomes a check offender then to make sure that you get only the offensive move is to shift() the array so that the none offensive move in the array can be deleted , do this if you are sure that there a i a move square thing
    rookBishopEnigne(thePieceShort)
}
function knight (thePieceShort) {
    rookBishopEnigne(thePieceShort, 1, 2)
    rookBishopEnigne(thePieceShort, -1, 2)
    rookBishopEnigne(thePieceShort, -1, -2)
    rookBishopEnigne(thePieceShort, 1, -2)
    rookBishopEnigne(thePieceShort, 2, 1)
    rookBishopEnigne(thePieceShort, -2, 1)
    rookBishopEnigne(thePieceShort, -2, -1)
    rookBishopEnigne(thePieceShort, 2, -1)
}


function movePiece(tileID, thePieceShort) {
    document.getElementById(thePieceShort.cords[0] + '' + thePieceShort.cords[1]).firstElementChild.remove()
    let newImg = document.createElement('img')
    newImg.src = thePieceShort.img
    newImg.onclick = function () { CalculatePossibleMoves(thePieceShort.name) }
    thePieceShort.cords = ''
    thePieceShort.cords = [parseInt(tileID[0]), parseInt(tileID[1])]
    document.getElementById(tileID).appendChild(newImg)
    for (let i = 0; i < possibleMoves.length; i++) {
        if (possibleMoves[i] !== 'break') {
            document.getElementById(possibleMoves[i]).style["background-color"] = ""
            document.getElementById(possibleMoves[i]).onclick = ''
        }
    }
    possibleMoves = []
    killPiece(thePieceShort, tileID)
    checkForCheck(thePieceShort)
    if (inCheck) {
        checkForCheckmate(thePieceShort)
    }
}

function highlightSquares(thePieceShort) {
    for (let i = 0; i < possibleMoves.length; i++) {
        if (possibleMoves[i] !== 'break') {
            document.getElementById(possibleMoves[i]).style["background-color"] = "red"
            document.getElementById(possibleMoves[i]).onclick = function () { movePiece(this.id, thePieceShort) }
        }
    }
}

function preventKingFromCheck(thePiece) {
    console.log('RED ALERT')
    let stuff
    let kingsCords = thePiece.cords
    thePiece.cords = []
    for (let key in pieces) {
        if (thePiece.side !== pieces[key].side) {
            CalculatePossibleMoves(pieces[key].name, 1, 1, 1, 1)
            possibleMoves.push(thePiece.cords[0] + '' + thePiece.cords[1])
        }
    }

    thePiece.cords = kingsCords
    stuff = possibleMoves
    possibleMoves = []
    queenKing(thePiece)
    for (let i = 0; i < stuff.length; i++) {
        for (let ii = 0; ii < possibleMoves.length; ii++) {
            if ((stuff[i] === possibleMoves[ii]) && (stuff[i] !== 'break')) {
                console.log('tile blocked at: ', possibleMoves[ii])
                possibleMoves.splice(ii, 1)
            }
        }
    }
    let isEmpty = true
    for (let i = 0; i < possibleMoves.length; i++) {
        if (possibleMoves[i] !== 'break') {
            isEmpty = false
        }
    }
    if (!isEmpty) {
        inCheck = 0
        return 1
    } else {
        return 0
    }
}
function stopCheck(thePieceShort) {
    if (inCheck > 1) {
        return 0
    }
    checkOffenders.pop()
    let placeholder = []
    let yPlaceholder = []
    let kingSpot
    let theKing
    for (key in pieces) {
        if ((thePieceShort.side === pieces[key].side) && (pieces[key].class === 'king')) {
            theKing = pieces[key]
        }
    }
    for (let i = 0; i < checkOffenders.length; i++) {
        if (checkOffenders[i] === (theKing.cords[0] + '' + theKing.cords[1])) {
            kingSpot = i
            break
        }
    }
    for (let i = kingSpot; i > -1; i--) {
        if (checkOffenders[i] === 'break') {
            break
        }
        yPlaceholder.push(checkOffenders[i])
    }
    checkOffenders = yPlaceholder
    checkOffenders.push(checkOffendersPiece.cords[0] + '' + checkOffendersPiece.cords[1])
    for (let i = 0; i < checkOffenders.length; i++) {
        for (let ii = 0; ii < possibleMoves.length; ii++) {
            if (possibleMoves[ii] === checkOffenders[i]) {
                placeholder.push(possibleMoves[ii])
            }
        }
    }
    possibleMoves = placeholder
    highlightSquares(thePieceShort)

    if (possibleMoves.length !== 0) {
        inCheck = 0
        return 1
    } else {
        return 0
    }
}
function checkForCheckmate(thePieceShort) {
    // checkForCheck(thePieceShort)
    let xCheck
    let yCheck
    console.log(checkOffendersPiece)
    for (key in pieces) {
        if ((thePieceShort.side !== pieces[key].side)) {
            if (pieces[key].class === 'king') {
                if (preventKingFromCheck(pieces[key]) === 0) {
                    console.log('king cant move anywhere')
                    xCheck = true
                }
            }
            if (stopCheck(pieces[key]) === 0) {
                console.log('Piece cant stop chek mate')
                yCheck = true
            }
        }
    }
    if ((yCheck === true) && (xCheck === true)) {
        console.log('checkmate')
        alert('checkmate')
    } else {
        alert('check')
    }
}
function changeSides(thePieceShort) {
    if (thePieceShort.side === 'w') {
        return 'b'
    } else {
        return 'w'
    }
}
function preventCheckByMove(thePieceShort) {
    let placeholder = thePieceShort.cords
    console.log(possibleMoves)
    thePieceShort.side = changeSides(thePieceShort)
    thePieceShort.cords = ''
    checkForCheck(thePieceShort, 1)
    thePieceShort.cords = placeholder
    placeholder = []
    thePieceShort.side = changeSides(thePieceShort)
    if (inCheck > 1) {

        return 0
    }
    if (inCheck) {
        CalculatePossibleMoves(thePieceShort.name, 0, 0, 0, 1)
    } else {
        CalculatePossibleMoves(thePieceShort.name, 0, 0, 0, 1)
        return 0
    }

    if (possibleMoves.length !== 0) {
        inCheck = 0
    }
}
function CalculatePossibleMoves(thePiece, xcheckForCheck = 0, prevent = 0, kingPrevent = 0, preventMove = 0) { //should prevent check first, than after move it should check for check
    let thePieceShort = pieces[thePiece]

    if (thePieceShort.class === 'rook') {
        rook(thePieceShort)
    } else if (thePieceShort.class === 'bishop') {
        bishop(thePieceShort)
    } else if (thePieceShort.class === 'queen') {
        queenKing(thePieceShort)
    } else if (thePieceShort.class === 'king') {
        if (!kingPrevent) {
            preventKingFromCheck(thePieceShort)
        } else {
            queenKing(thePieceShort)
        }
    } else if (thePieceShort.class === 'queen') {
        queenKing(thePieceShort)
    } else if (thePieceShort.class === 'pawn') {
        pawn(thePieceShort)
    } else if (thePieceShort.class === 'knight') {
        knight(thePieceShort)
    }
    if (!preventMove) {
        if (thePieceShort.class !== 'king') {
            preventCheckByMove(thePieceShort)
        }
    }
    console.log(possibleMoves, inCheck)
    if ((!prevent) && (inCheck) && (thePieceShort.class !== 'king')) {
        stopCheck(thePieceShort)
    } else if (!xcheckForCheck) {
        console.log(possibleMoves)
        highlightSquares(thePieceShort)
    }

}
