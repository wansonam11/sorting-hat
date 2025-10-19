// Hogwarts Sorting Hat Quiz - 10 questions
var currentQuestion = 1;

// 질문: A/B 각각 어느 기숙사에 점수를 줄지 map으로 지정
var q = {
  1: {
    title: "Q1. 危険やリスクのある状況で、あなたはどう動きますか？",
    A: "A. 勇気を出して、まず一歩踏み出す（やってみる）。",
    B: "B. 冷静に状況を見て、勝てるタイミングを待つ。",
    map: { A: "G", B: "S" },
  },
  2: {
    title: "Q2. チームでの自分の役割に近いのは？",
    A: "A. 新しいアイデアや知識を持ち込み、発想で貢献する。",
    B: "B. 誰も置いていかないように支え、粘り強く進める。",
    map: { A: "R", B: "H" },
  },
  3: {
    title: "Q3. 大切にしている価値観はどちらに近い？",
    A: "A. 正義・勇気・名誉",
    B: "B. 成功・影響力・野心",
    map: { A: "G", B: "S" },
  },
  4: {
    title: "Q4. 学び方・成長スタイルで近いのは？",
    A: "A. 知的好奇心で深掘りし、論理的に理解する。",
    B: "B. コツコツ継続し、努力で身につける。",
    map: { A: "R", B: "H" },
  },
  5: {
    title: "Q5. 理想の一日により近いのは？",
    A: "A. 新しい挑戦や冒険にトライする一日。",
    B: "B. 仲間と信頼を築き、温かく過ごす一日。",
    map: { A: "G", B: "H" },
  },
  6: {
    title: "Q6. 友達と対立したとき、あなたは？",
    A: "A. 正直にぶつかって解決する。",
    B: "B. 慎重に話し合い、関係を守る。",
    map: { A: "G", B: "H" },
  },
  7: {
    title: "Q7. 達成感を感じる瞬間は？",
    A: "A. 難しい問題を創造的に解決したとき。",
    B: "B. 激しい競争に勝利したとき。",
    map: { A: "R", B: "S" },
  },
  8: {
    title: "Q8. より大切にしているのは？",
    A: "A. 学びや探求そのもの。",
    B: "B. 結果や成果。",
    map: { A: "R", B: "S" },
  },
  9: {
    title: "Q9. リーダーになったとき、どんなタイプに近い？",
    A: "A. 先頭に立ち、リスクも背負って導く。",
    B: "B. 皆の意見を尊重し、調和的に導く。",
    map: { A: "G", B: "H" },
  },
  10: {
    title: "Q10. 最大の恐れは？",
    A: "A. 挑戦を逃し、チャンスを失うこと。",
    B: "B. 認められず、忘れられてしまうこと。",
    map: { A: "G", B: "S" },
  },
};

var result = {
  G: {
    house: "グリフィンドール 🦁",
    explain:
      "勇気・大胆さ・騎士道精神を重んじるタイプ。新しい挑戦にワクワクします。",
    img: "img/Gryffindor.png",
  },
  S: {
    house: "スリザリン 🐍",
    explain: "野心・機転・自己主導性が強いタイプ。勝つための最適解を探せます。",
    img: "img/Slytherin.png",
  },
  H: {
    house: "ハッフルパフ 🦡",
    explain:
      "誠実・勤勉・忠誠心が強いタイプ。仲間を大切にし最後までやり抜きます。",
    img: "img/Hufflepuff.png",
  },
  R: {
    house: "レイブンクロー 🦅",
    explain: "知性・創造性・独立心が強いタイプ。学びと発想で世界を広げます。",
    img: "img/Ravenclaw.png",
  },
};

// 점수 객체
var scores = { G: 0, S: 0, H: 0, R: 0 };

function start() {
  $(".quiz").hide();
  $(".quiz-question").show();
  next();
}

$("#A").click(function () {
  // 현재 질문의 A 선택에 해당하는 기숙사 점수 +1
  var idx = currentQuestion - 1; // next()에서 currentQuestion을 증가시키므로 클릭 시점은 이전 질문
  var qItem = q[idx];
  if (qItem && qItem.map && qItem.map.A) {
    scores[qItem.map.A] += 1;
  }
  next();
});

$("#B").click(function () {
  // 현재 질문의 B 선택에 해당하는 기숙사 점수 +1
  var idx = currentQuestion - 1;
  var qItem = q[idx];
  if (qItem && qItem.map && qItem.map.B) {
    scores[qItem.map.B] += 1;
  }
  next();
});

// 선택 버튼 기능
$(document).on("click", "#confirm-house", function() {
  // 현재 기숙사 선택 확정 - 로고 크게 만들기
  $("#img").addClass("confirmed");
  $(".selection-message").addClass("confirmed");
  $(".choice-buttons").addClass("confirmed");

  // 확정 메시지 표시
  setTimeout(function() {
    $("#selection-text").html("おめでとうございます！寮が確定されました！");
    $(".alternative-text").hide();
  }, 1000);
});

$(document).on("click", "#choose-different", function() {
  // 다른 기숙사 선택 - 선택 영역 보이기
  $(".house-selection-area").show();
});

// 기숙사 선택 기능
$(document).on("click", ".house-option", function() {
  var selectedHouse = $(this).data("house");

  // 모든 선택을 해제하고 클릭된 것만 선택
  $(".house-option").removeClass("selected");
  $(this).addClass("selected");

  // 선택된 기숙사의 정보로 업데이트
  $("#img").attr("src", result[selectedHouse]["img"]);
  $("#member").html(result[selectedHouse]["house"]);
  $("#explain").html(result[selectedHouse]["explain"]);

  // 기숙사 선택 완료 후 선택 영역 숨기기 및 초기 상태로 리셋
  $(".house-selection-area").hide();

  // 확정 상태 리셋
  $("#img").removeClass("confirmed");
  $(".selection-message").removeClass("confirmed");
  $(".choice-buttons").removeClass("confirmed");
  $("#selection-text").html("この寮を選択しますか？");
  $(".alternative-text").show();
});

function next() {
  // 총 10문항 → currentQuestion이 11이면 결과
  if (currentQuestion === 11) {
    $(".quiz-question").hide();
    $(".quiz-result").show();

    // 최다 득점 기숙사 계산 (동점일 경우 우선順位로 결정)
    var order = ["G", "R", "H", "S"]; // 동점 타이ブ레이커(任意で変更OK)
    var topKey = order[0];
    for (var k of ["G", "S", "H", "R"]) {
      if (
        scores[k] > scores[topKey] ||
        (scores[k] === scores[topKey] &&
          order.indexOf(k) < order.indexOf(topKey))
      ) {
        topKey = k;
      }
    }

    $("#img").attr("src", result[topKey]["img"]);
    $("#member").html(result[topKey]["house"]);
    $("#explain").html(result[topKey]["explain"]);

    // 추천된 기숙사를 하이라이트
    $(".house-option").removeClass("selected");
    $(`.house-option[data-house="${topKey}"]`).addClass("selected");
  } else {
    // 진행 바 업데이트 (10문항)
    $(".quiz__progress-bar").attr("style", "width: calc(100/10*" + currentQuestion + "%)");
    $("#title").html(q[currentQuestion]["title"]);
    $("#A").html(q[currentQuestion]["A"]);
    $("#B").html(q[currentQuestion]["B"]);
    currentQuestion++;
  }
}
