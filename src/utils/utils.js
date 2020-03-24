export const outils = {
    methods: {

        getMapScreenByRef(ref) {
            // console.log(ref)
            let maps = this.$store.state.maps
            for (let i = 0; i < maps.length; i++) {
                // console.log(maps[i].id)
                if (maps[i].id == ref) {
                    return maps[i].miniature
                }
            }
        },

        getSerieDetailById(id) {

            let series = this.$store.state.series
            for (let i = 0; i < series.length; i++) {
                // console.log(maps[i].id)
                if (series[i].id == id) {
                    return series[i]
                }
            }

        }

    }
}
