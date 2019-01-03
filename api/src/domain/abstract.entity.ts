import { BeforeInsert, Column, BeforeUpdate, Entity } from "typeorm";

export abstract class AbstractEntity {

    @Column({ name: 'created' })
    createdDate : Date;

    @Column({ name: 'updated' })
    lastUpdated : Date;
    

    @BeforeInsert()
    updateDatesForSave() {
        if(!this.createdDate){
            this.createdDate = new Date();
        }
        this.lastUpdated = new Date();
    }

}