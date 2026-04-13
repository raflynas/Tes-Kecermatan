const simbol = {
    A:"𓂀",
    B:"Ϟ",
    C:"Ѫ",
    D:"ᚦ",
    E:"☬"
}

let jawabanBenar = ""
let skor = 0
let waktu = 180
let timerInterval
let nomorSoal = 0
let totalSoal = 15
let bolehJawab = true

const PASSWORD_AKSES = "123"; // ganti sesuai keinginan

function cekPassword() {
    const input = document.getElementById("inputPassword").value;
    const error = document.getElementById("errorPassword");

    if (input === PASSWORD_AKSES) {
        document.getElementById("halamanPassword").style.display = "none";
        document.getElementById("halamanTes").style.display = "block";
    } else {
        error.style.display = "block";
    }
}

document.getElementById("inputPassword").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        cekPassword();
    }
});

function keHalamanPetunjuk(){
    let nama = document.getElementById("nama").value
    let nim = document.getElementById("nim").value

    if(nama=="" || nim==""){
        alert("Nama dan NIM wajib diisi!")
        return
    }

    document.getElementById("login").classList.add("hidden")
    document.getElementById("petunjukHalaman").classList.remove("hidden")
}

function mulaiTes(){
    let nama = document.getElementById("nama").value
    let nim = document.getElementById("nim").value

    // pindah dari halaman penjelasan ke halaman soal
    document.getElementById("petunjukHalaman").classList.add("hidden")
    document.getElementById("tes").classList.remove("hidden")

    // tampilkan data peserta di topbar
    document.getElementById("namaPeserta").innerText = nama
    document.getElementById("nimPeserta").innerText = nim

    // reset nilai saat mulai ujian
    skor = 0
    waktu = 180
    nomorSoal = 0

    document.getElementById("progress").innerText = 0
    document.getElementById("timer").innerText = waktu

    mulaiTimer()
    buatSoal()
}

function mulaiTimer(){
    timerInterval = setInterval(()=>{
        waktu--
        document.getElementById("timer").innerText = waktu

        //  jika sisa 10 detik → jadi merah berkedip
        if(waktu <= 10){
            document.getElementById("timer").classList.add("timer-merah")
        }

        if(waktu==0){
            selesaiTes()
        }
    },1000)
}

function buatSoal(){
    bolehJawab = true

    if(nomorSoal >= totalSoal){
        selesaiTes()
        return
    }

    nomorSoal++

    //  update progress soal
    document.getElementById("progress").innerText = nomorSoal

    let huruf = ["A","B","C","D","E"]
    let acak = huruf.sort(()=>Math.random()-0.5)

    jawabanBenar = acak[0] // huruf yg hilang
    let tampil = acak.slice(1)

    let teksSoal = tampil.map(h=>simbol[h]).join(" ")
    document.getElementById("soal").innerText = teksSoal
}

function jawab(pilihan){

    // cegah klik berulang
    if(!bolehJawab) return
    bolehJawab = false   // 🔒 kunci tombol

    document.getElementById("klikSound").play()

    if(pilihan == jawabanBenar){
        skor++
    }

    // kasih delay kecil biar soal benar2 ganti dulu
    setTimeout(()=>{
        buatSoal()
    },200)
}

function selesaiTes(){
    clearInterval(timerInterval)

    //  bunyikan alarm
    document.getElementById("alarmSound").play()

    document.getElementById("tes").innerHTML = `
    <h2>WAKTU HABIS</h2>
    <h3>Skor Akhir: ${skor} / ${totalSoal}</h3>
    <button class="btn-utama" onclick="location.reload()">Ulangi Tes</button>
    `
}