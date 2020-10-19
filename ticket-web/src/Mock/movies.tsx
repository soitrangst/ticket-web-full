
interface Movie{
    id: number;
    name: string;
    date: Array<string>;
}
const movies:Array<Movie> = [
    {   id:1,
        name:"QUÁI VẬT SĂN ĐÊM",
        date:[
            "20/10/2020T10:30",
            "20/10/2020T8:30",
            "20/10/2020T15:30",
            "20/10/2020T16:30"],
    },
    {   id:2,
        name:"SÓNG THẦN Ở HAEUNDAE",
        date:[
            "22/10/2020T10:30",
            "22/10/2020T8:30",
            "22/10/2020T15:30",
            "22/10/2020T16:30"],
    },
    {   id:3,
        name:"CỤC NỢ HÓA CỤC CƯNG",
        date:[
            "23/10/2020T10:30",
            "23/10/2020T8:30",
            "24/10/2020T15:30",
            "25/10/2020T16:30"],
    },
    {   id:4,
        name:"PHI VỤ HOÀN LƯƠNG",
        date:[
            "25/10/2020T10:30",
            "25/10/2020T8:30",
            "26/10/2020T15:30"]
    }
]

export{
    movies
}