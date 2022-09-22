import { collection } from "firebase/firestore";
import { useEffect } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { useCausesContext } from "../../../contexts/CauseContext";
import { getAll } from "../../../services/crudService";
import { db } from "../../../firebase";
import { CardTemplate } from "../Catalog/CardTemplate";
import { useState } from "react";

const causesCollectionRef = collection(db, "causes");


export const MyCauses = () => {
    const { currentUser } = useAuth();
    const { causes, setCauses } = useCausesContext();
    const [myCauses, setMyCauses] = useState([]);

    if (currentUser) {
        console.log(currentUser.uid);
    }

    useEffect(() => {
        try {
            getAll(causesCollectionRef)
                .then(docs => {
                    let arr = [];

                    docs.forEach((doc) => {
                        let fields = doc.data();

                        arr.push({
                            id: doc.id,
                            fields: fields
                        });

                    });

                    setCauses(arr);

                    if (arr.length > 0) {
                        const myCausesArr = arr.filter(c => c.fields.creator === currentUser.uid);
                        setMyCauses(myCausesArr);
                    }

                });
        } catch (error) {
            console.log(error);
        }
    }, []);



    console.log(causes);
    console.log(myCauses);

    return (
        <>
            <h1 className="flex justify-center text-center my-7">My causes Page</h1>
            <div className="flex justify-center my-7">
                <div className="grid py-10 justify-center my-7 -space-x-15 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-14">
                    {myCauses.length
                        ? causes.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />)
                        : <h3 className="no-articles">You do not have added causes yet</h3>
                    }
                </div>
            </div>
        </>
    );
}