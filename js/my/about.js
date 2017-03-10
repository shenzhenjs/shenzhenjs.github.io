/**
 * @author: admin
 * @description:
 * @Date: 2017/2/12 19:16
 */
(function($){
    'use strict'

    window.App = window.App || {}

    App.city = [
        'shenzhen'
    ]

    App.about = {

        init() {
            this.__initVue()
        },

        __initVue: function () {
            var self = this,
                allUserComponents = {
                    template: tplUserList,
                    props: ['allUserInfo']
                }

            var vm = new Vue({
                el: '#app',
                data: function () {
                    return {
                        shenzhen: {}
                    }
                },
                components: {
                    'all-user-list': allUserComponents
                },
                created: function () {
                    this._setData()
                },
                methods: {
                    _setData: function () {
                        var self = this,
                            reqs = []

                        for(var i = 0; i < App.city.length; i++){
                            reqs.push($.get('/data/' + App.city[i] + '.json'))
                        }

                        $.when.apply($, reqs).then(function(data1, data2, data3){
                            for(var i=0,len = App.city.length; i < len; i++){
                                self[App.city[i]] = arguments[i]
                            }
                        })
                    }
                }
            })
        },

    }

    App.about.init()

}(jQuery))