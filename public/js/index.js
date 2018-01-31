(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let stories = require('./stories.json')


$(document).ready(() => {
  let outTime = 600;
  let inTime = 1000;
  let contiTime = 1000;
  let currentChapter = 0;
  let first = true;
  let chapterCount = 8;

  const areas = document.getElementsByClassName('area');
  const index = document.getElementsByClassName('index');
  const bonusIndex = document.getElementById(-1);
  const story = document.getElementById('story');
  const conti = document.getElementById('continue');
  const gameLeft = document.getElementById('gameLeft');
  const gameRight = document.getElementById('gameRight');
  const gameFull = document.getElementsByClassName('gameFull');
  const gameFrame = document.getElementById('gameFrame')
  const gameParagraph = document.getElementsByClassName('gameParagraph');
  const btns = document.getElementsByClassName('btn');
  const goBack = document.getElementById('goBack');
  const goForward = document.getElementById('goForward');
  const startOver = document.getElementById('startOver');
  const video = document.getElementById('video');
  const bonus = document.getElementById('bonus');
  const bonusText = document.getElementById('bonusText');

  $('body').flowtype({
    minFont: 3,
    maxFont: 15,
    fontRatio: 50
  });

  let change = [];
  let unRender = [index, gameLeft, gameRight, gameFrame, story, conti, btns, bonus, bonusText];
  let render = [];

  let loadTime = 200;
  let playTime = 5000
  video.load();

  setTimeout(() => {
    video.play();
    setTimeout(() => {
      video.pause();

      let areas = document.getElementsByClassName('area');
      $(areas).fadeIn(inTime);
    }, playTime);
  }, loadTime)

  let bonusAccess = false;
  if (document.cookie.length < 3) {
    document.cookie = 'bonus=false';
  } else if (document.cookie[6] == 't') {
    bonusAccess = true;
  } else {
    $(bonusIndex).hide();
  }




  $('li').on({
    "click": (event) => {
      if ($(event.target).hasClass('bonusGame')) {
        let gameID = event.target.id;
        $(gameFrame).html(`<iframe id="iframe" allowtransparency="true" width="485" height="402" src="//scratch.mit.edu/projects/embed/`+gameID+`/?autostart=false" frameborder="0" allowfullscreen></iframe>`);
        renderGame();
      } else if (!event.target.id && $(event.target).hasClass('game')) {
        renderGame();
      } else {
        currentChapter = event.target.id;
        $(areas).fadeOut(outTime, () => {
          $(areas).fadeIn(inTime);
        });
        if (!currentChapter) {
          currentChapter = 0;
          $(startOver).fadeOut(100);
          video.load();
          video.play();
          setTimeout(() => {
            video.pause();
            renderPage(currentChapter);
          }, playTime)
        } else {
          renderPage(currentChapter);
        }
      }
    }
  });

  $(document).click(event => {
    if (!$(event.target).closest('#iframe').length) {
      if ($(gameFrame).is(':visible')) {
        $(gameFrame).animate({
          opacity: [0, 'linear']
        }, outTime, () => {
          $(gameFrame).hide();
          $(btns).show();
        })
      }
    }
  })

  $(goForward).on({
    "click": () => {
      currentChapter++
      renderPage(currentChapter);
    }
  })

  $(goBack).on({
    "click": () => {
      currentChapter = 0;
      renderPage(currentChapter);
    }
  })

  renderGame = () => {
    $(btns).hide()
    setTimeout(() => {
      $(gameFrame).css({display: 'grid'});
      $(gameFrame).animate({
        opacity: [1, 'linear']
      }, inTime)
    }, 100)
  }


  renderItems = (r, t) => {
    setTimeout(() => {
      r.forEach(i => {
        if (i != gameRight && i != conti) {
          $(i).fadeIn(inTime);
        } else {
          $(i).fadeIn(inTime + contiTime);
        }
      })
      setTimeout(() => {
        $(btns).css({display: 'flex'});
      }, t)
    }, outTime)
  }

  changeItems = (i, c) => {
    setTimeout(() => {
      i.forEach(item => {
        switch (item) {
          case story:
            $(story).children('h1').html(stories[c].title);
            $(story).children('p').html(stories[c].text);
            break;
          case conti:
            $(conti).children('p').html(stories[c].continue);
            break;
          case gameRight:
            $(gameParagraph).html(stories[c].gameText);
            $(gameFrame).html(`<iframe id="iframe" allowtransparency="true" width="485" height="402" src="//scratch.mit.edu/projects/embed/`+stories[c].gameCode+`/?autostart=false" frameborder="0" allowfullscreen></iframe>`);
            break;
          case gameLeft:
            c = c - 1
            $(gameParagraph).html(stories[c].gameText);
            $(gameFrame).html(`<iframe id="iframe" allowtransparency="true" width="485" height="402" src="//scratch.mit.edu/projects/embed/`+stories[c].gameCode+`/?autostart=false" frameborder="0" allowfullscreen></iframe>`);
            break;
        }
      })
    }, outTime)
  }

  renderPage = (chap) => {
    unRender.forEach(item => {
      $(item).fadeOut(outTime);
    });

    if (bonusAccess) {
      $(bonusIndex).show();
    }

    let t = inTime;

    if (!chap) {chap = 0}

    if (chap == -1) {
      render = [goBack, bonus];
      renderItems(render, t);
      $(bonusText).children('p').html(`Deze website.. of beter gezegd web app werkt bijna volledig op javascript. De pug(html) zorgt voor een structuur, de sass(css) voor de layout en visuele basissen en de javascript(jquery) zorgt voor de animaties en werkende knoppen. Daarnaast runt de website op een vps doormiddel van een nodejs(javascript framework) server die via een reverse proxy server verbonden is met sprookjesboek.tk <br/><br/>Door javascript te gebruiken inplaats van meerdere webpaginas bespaar je op de hoeveelheid te downloaden bestanden en de grootte ervan. Het kost meer resources op de computer waar de site open staat, maar bespaart een grote hoeveelheid get/post requests naar de server.<br/><br/>Het belangrijkste onderdeel van de site zijn de animaties. Deze zijn gedaan doormiddel van jQuery. jQuery is een javascript library die helpt om met de DOM(Document Object Model) te werken en veel mogelijkheden qua animaties biedt.`);
      $(bonusText).fadeIn(inTime);
    } else if (chap == 0) {
      setTimeout(() => {
        $(index).fadeIn(inTime);
      }, outTime)
    } else if (chap == 2) {
      render = [story];
      changeItems(render, chap);
      renderItems(render, t);
    } else if (chap == 5 || chap == 6) {
      render = [story, conti];
      t += contiTime;
      changeItems(render, chap);
      renderItems(render, t);
    } else if (chap == 7) {
      render = [gameLeft];
      changeItems(render, chap);
      renderItems(render, t);
    } else if (chap == chapterCount) {
      render = [story];
      changeItems(render, chap);
      renderItems(render, t);
    } else if (chap > chapterCount) {
      document.cookie = 'bonus=true';
      bonusAccess = true;
      video.play();
      setTimeout(() => {
        video.pause();
        render = [startOver];
        renderItems(render, t);
      }, 6200 - playTime);
    } else {
      render = [story, gameRight];
      changeItems(render, chap);
      renderItems(render, t);
    }
  }


});

},{"./stories.json":2}],2:[function(require,module,exports){
module.exports={
  "1": {
    "title": "Spullen voor grootmoeder",
    "text": "Er was eens een meisje genaamd Roodkapje.<br/>Een keer vroeg de moeder van Roodkapje of Roodkapje koekjes en wat te drinken naar grootmoeder zou willen brengen want grootmoeder was ziek.",
    "gameText": "Help Roodkapje met het verzamelen van de koekjes voor grootmoeder!",
    "gameCode": "200540194"
  },
  "2": {
    "title": "Op weg naar grootmoeder",
    "text": "Toen ging Roodkapje op weg naar grootmoeder.<br/>Grootmoeder woonde in het bos.<br/>Toen Roodkapje onderweg was kwam ze een wolf tegen.<br/>Maar Roodkapje was niet bang want zag niets verkeerds in de wolf.<br/>De wolf vroeg wat roodkapje ging doen, toen Roodkapje had uitgelegd dat ze koekjes en drinken naar Grootmoeder ging brengen vroeg de wolf waar haar grootmoeder dan woonden. Opeens nam de wolf snel afscheid en ging er snel van door.<br/>Toen liep Roodkapje weer verder.<br/>",
  },
  "3": {
    "title": "Hans en Grietje",
    "text": "Toen kwam Roodkapje 2 kinderen tegen genaamd Hans en grietje.<br/>Hans en Grietje vertelde dat ze door hun ouders, op het idee van hun moeder, achter gelaten in het bos. En dat ze dit plan hadden afgeluisterd en toen broodkruimels hadden gestrooid. Maar dat de kruimels waren opgegeten door de bosdieren.<br/>Roodkapje hielp toen Hans en Grietje om de weg naar huis te vinden.<br/>",
    "gameText": "Help Hans en Grietje om de weg naar huis te vinden!",
    "gameCode": "200773505"
  },
  "4": {
    "title": "Sneeuwwitje en de dwergen",
    "text": `Toen Hans en Grietje weer veilig thuis kwamen bleek hun moeder gestorven te zijn en ze leefden nog lang en gelukkig met hun vader. Roodkapje vervolgde toen haar weg op naar grootmoeder. Na een tijdje kwam Roodkapje een meisje tegen genaamd Sneeuwwitje. Sneeuwwitje vertelde dat zij haar huisgenootjes kwijt was die ook wel \`de zeven dwergen’ genoemd werden. Roodkapje vertelde dat ze wel even tijd had om te helpen zoeken.`,
    "continue": ``,
    "gameText": "Help Sneeuwwitje met het vinden van de zeven dwergen!",
    "gameCode": "200685926"
  },
  "5": {
    "title": "Bij grootmoeder",
    "text": `Toen Sneeuwwitje alle zeven dwergen weer had gevonden met Roodkapje.<br/>Vervolgde Roodkapje haar reis naar grootmoeder. <br/>Toen Roodkapje bij grootmoeder aankwam stond de deur open. <br/>Roodkapje liep meteen naar boven en vond oma daar in bed. <br/>"O grootmoeder, wat heb je grote oren!" - <br/>"Dat is om je beter te kunnen horen." - <br/>"Maar grootmoeder, wat heb je grote ogen!" - <br/>"Dat is om je beter te kunnen zien." - `,
    "continue": `<br/>"Maar grootmoeder, wat heb je grote handen!" - <br/>"Dat is om je beter te kunnen pakken." - <br/>"Maar grootmoeder, wat heb je een verschrikkelijk grote bek!" - <br/>"Dat is om je beter op te kunnen opeten."<br/>En nauwelijks had de wolf dat gezegd of hij sprong uit bed en verslond het arme Roodkapje in één hap.`,
    "gameText": "",
    "gameCode": ""
  },
  "6": {
    "title": "De redding van Roodkapje",
    "text": `
      Toen de wolf zo zijn honger gestild had ging hij weer heerlijk in het bed liggen, sliep in en begon heel hard te snurken.
      <br/>Toen kwam net de jager voorbij en die dacht: "Wat snurkt dat oude mens hard, ik zal eens kijken of haar wat mankeert."
      <br/>Hij kwam in de kamer en toen hij voor het bed stond zag hij dat de wolf erin lag.
      <br/>"Vind ik je hier, ouwe boosdoener," zei hij, "ik heb lang naar je gezocht."
      <br/>Hij wilde net gaan schieten, maar toen hij zijn geweer richtte bedacht hij zich ineens dat de wolf de oude vrouw misschien had opgegeten en dat ze misschien nog te redden was.
`,
    "continue": `
    Hij schoot niet maar begon met een schaar de buik van de slapende wolf open te knippen.
    <br/>Na een paar knippen zag hij een rood kapje glimmen en na nog een paar knippen sprong het meisje eruit en riep:
    <br/>"O, wat ben ik bang geweest, wat was het donker in de buik van de wolf!"
    <br/>En toen kwam de oude grootmoeder ook nog levend tevoorschijn, al kon ze haast niet ademen.
    <br/>Roodkapje haalde snel een paar grote stenen die ze in de buik van de wolf kon stoppen`,
    "gameText": "Help Roodkapje snel met het vinden van stenen om in de buik te stoppen!",
    "gameCode": "200764912"
  },
  "8" : {
    "title": "Het einde",
    "text": `
    Toen stopte Roodkapje de stenen in de buik van de wolf.
    <br/>En toen hij wakker werd, wilde hij wegspringen, maar de stenen waren zo zwaar dat hij onmiddellijk viel en dood was.
    <br/><br/>Nu waren ze alle drie blij.
    <br/>De jager stroopte de pels van de wolf af en trok daarmee naar huis, de grootmoeder at de koek en dronk het lekkere drankje, die Roodkapje had meegebracht, en die maakte haar beter.
    <br/><br/>En ze leefde nog lang en gelukkig.
`
  }
}

},{}]},{},[1]);
