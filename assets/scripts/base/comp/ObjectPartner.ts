import { Component, director, _decorator } from "cc";
const { ccclass, property } = _decorator;

export class GObjectPartner extends Component {
    public _emitDisplayEvents: boolean = false;

    public callLater(callback: Function, delay?: number): void {
        if (!director.getScheduler().isScheduled(callback, this))
            this.scheduleOnce(callback, delay);
    }

    // public onClickLink(evt: Event, text: string) {
    //     this.node.emit(Event.LINK, text, evt);
    // }

    // protected onEnable() {
    //     this.node["$gobj"].onEnable();

    //     if (this._emitDisplayEvents)
    //         this.node.emit(Event.DISPLAY);
    // }

    // protected onDisable() {
    //     this.node["$gobj"].onDisable();

    //     if (this._emitDisplayEvents)
    //         this.node.emit(Event.UNDISPLAY);
    // }

    // protected update(dt) {
    //     this.node["$gobj"].onUpdate(dt);
    // }

    // protected onDestroy() {
    //     this.node["$gobj"].onDestroy();
    // }
}